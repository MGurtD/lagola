import mongoose from 'mongoose'
import xlsxFile from 'read-excel-file/node'

const filePath = `${__dirname}/ProductCatalog.xlsx`

const categoryStructure = new Map();
categoryStructure.set(0, 'parent')
categoryStructure.set(1, 'name')
categoryStructure.set(2, 'description')
categoryStructure.set(3, 'nonConsumptionNotificationDays')

const articleStructure = new Map();
articleStructure.set(0, 'code')
articleStructure.set(1, 'name')
articleStructure.set(2, 'description')
articleStructure.set(3, 'category')
articleStructure.set(4, 'currentStock')

const convertExcelSheetToJson = async (sheetName, sheetStructure) => {
    let array = []

    let rows = await xlsxFile(filePath, { sheet: sheetName }) 
    rows.shift()
    for (let i in rows) {
        let item = {}

        for (let j in rows[i]) {
            item[sheetStructure.get(Number(j))] = rows[i][j]
        }

        array.push(item)
    }

    // console.log(`convertExcelSheetToJson. Sheet '${sheetName}' conversion: \n`, array)
    return array
}

const category = mongoose.model('category')
const article = mongoose.model('article')

const integrateCategories = () => {

    convertExcelSheetToJson('Categories', categoryStructure).then(categories => {
        categories.filter(item => item.parent).forEach(insertCategory)
        categories.filter(item => !item.parent).forEach(insertCategory)
      })

} 
 
const insertCategory = async (item) => {      
  let categoryNameCount = await category.countDocuments({ name: item.name })
  let parentCategoryId = await category.findOne({ name : item.name }).exec()

  if (categoryNameCount === 0) {
    category.create({
      name: item.name,
      description: item.description,
      nonConsumptionNotificationDays: item.nonConsumptionNotificationDays,
      active: true,
      icon: '',
      parent: parentCategoryId
    })
  } else {
    console.log(`Category ${item.name} already exist`)
  }
}

const integrateArticles = () => {
  let counter = 0

  convertExcelSheetToJson('Productes', articleStructure).then(async articles => {
      
    counter = await article.countDocuments() + 1
    articles.forEach(async (item) => {         

      let exists = await article.exists({ name: item.name })
      if(!exists){

        try {
          let docCat = await category.findOne({ name: item.category })
          let code = `ART-${counter.toString().padStart(4, '0')}`

          counter++
          await article.create({
            code,
            name: item.name,
            description: item.description,
            currentStock: 0,
            active: true,  
            icon: '',
            category: docCat._id
          })

        } catch(err) {
          console.error(err)
        }
      
      } else {
        console.log(`Article '${item.name}' already exist`)
      }
  
    })
  })
}

export default {
    integrateArticles,
    integrateCategories
}
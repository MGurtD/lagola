import Controller from './Controller'
import CategoryService from './../services/CategoryService'
import Category from './../models/Category'

// Create the service with the model injected
const categoryService = new CategoryService(
    new Category().getInstance()
)

class CategoryController extends Controller {

    constructor(service) {
        super(service)
    }
    
}

// Inject the service and export a new instance of the controller
export default new CategoryController(categoryService)
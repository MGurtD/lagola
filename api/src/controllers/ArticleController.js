import Controller from './Controller'
import ArticleService from './../services/ArticleService'
import Article from './../models/Article'

// Create the service with the model injected
const service = new ArticleService(
    new Article().getInstance()
)

class ArticleController extends Controller {

    constructor(service) {
        super(service)
    }
    
}

// Inject the service and export a new instance of the controller
export default new ArticleController(service)
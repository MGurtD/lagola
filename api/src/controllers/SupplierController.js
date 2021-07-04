import Controller from './Controller'
import SupplierService from '../services/SupplierService'
import Supplier from '../models/Supplier'

// Create the service with the model injected
const supplierService = new SupplierService(
    new Supplier().getInstance()
)

class SupplierController extends Controller {

    constructor(service) {
        super(service)
    }
    
}

// Inject the service and export a new instance of the controller
export default new SupplierController(supplierService)
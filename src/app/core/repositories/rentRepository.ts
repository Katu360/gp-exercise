import {instanceToPlain} from "class-transformer";
import * as localforage from "localforage";
import {RentRequestModel} from "../models/RentRequestModel";

class RentRepository {

  store: LocalForage

  constructor() {
    this.store = localforage.createInstance({
      name: "rentRequests",
      driver: [
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE
      ]
    });
  }

  public async saveRentRequest(rentRequest: RentRequestModel) {
    const plainRentRequest = instanceToPlain(rentRequest)

    await this.store.setItem('rentRequest', plainRentRequest)
  }

}

export const rentRepository = new RentRepository()
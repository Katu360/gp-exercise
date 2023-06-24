
class CycleRepository {

  public async getCyclesList(): Promise<any> {
    return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/bicycle`).then( response => response.json())
  }
}

export const cycleRepository = new CycleRepository()
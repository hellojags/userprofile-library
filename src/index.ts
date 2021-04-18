import { Profiler } from "inspector";
import { DacLibrary } from "skynet-js";
import { PermCategory, Permission, PermType } from "skynet-mysky-utils";
import { Convert, Preferance, Profile } from "./skystandards"
import {
  ICreateDACResponse,IUserProfileDAC
} from "./types";

const DAC_DOMAIN = "skyuser.hns";

export class UserProfileDAC extends DacLibrary implements IUserProfileDAC {
  public constructor() {
    super(DAC_DOMAIN);
  }
  public async createProfile(data: Profile): Promise<ICreateDACResponse> {
    if (!this.connector) {
      throw new Error("Connector not initialized");
    }
    if(typeof data === 'string'){
      data = Convert.toProfile(data);
    }
    return await this.connector.connection
      .remoteHandle()
      .call("createNewProfile", data);
  }
  public async updateProfile(data: Profile): Promise<ICreateDACResponse> {
    if (!this.connector) {
      throw new Error("Connector not initialized");
    }
    if(typeof data === 'string'){
      data = Convert.toProfile(data);
    }
    return await this.connector.connection
      .remoteHandle()
      .call("updateProfile", data);
  }
  public async updatePreferance(data: Preferance): Promise<ICreateDACResponse> {
    if (!this.connector) {
      throw new Error("Connector not initialized");
    }
    if(typeof data === 'string'){
      data = Convert.toPreferance(data);
    }
    return await this.connector.connection
      .remoteHandle()
      .call("updatePreferance", data);
  }

  public async getProfile(): Promise<any> {
    if (!this.connector) {
      throw new Error("Connector not initialized");
    }
    return await this.connector.connection
      .remoteHandle()
      .call("getProfile",{test:"test"});
  }
  public async getPreferance(): Promise<any> {
    if (!this.connector) {
      throw new Error("Connector not initialized");
    }
    return await this.connector.connection
      .remoteHandle()
      .call("getPreferance",{test:"test"});
  }
  public async getProfileHistory(): Promise<any> {
    if (!this.connector) {
      throw new Error("Connector not initialized");
    }
    return await this.connector.connection
      .remoteHandle()
      .call("getProfileHistory",{test:"test"});
  }
  public async getPreferanceHistory(): Promise<any> {
    if (!this.connector) {
      throw new Error("Connector not initialized");
    }
    return await this.connector.connection
      .remoteHandle()
      .call("getPrefHistory",{test:"test"});
  }

  public getPermissions(): Permission[] {
    return [
      new Permission(
        DAC_DOMAIN,
        DAC_DOMAIN,
        PermCategory.Discoverable,
        PermType.Read
      ),
      new Permission(
        DAC_DOMAIN,
        DAC_DOMAIN,
        PermCategory.Discoverable,
        PermType.Write
      ),
    ];
  }
}

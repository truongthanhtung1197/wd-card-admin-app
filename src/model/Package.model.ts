import { TimeStamp } from "./Common.model";

export enum PACKAGE_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface PackageFeature extends TimeStamp {
  id?: number;
  packageId?: number;
  featureKey?: string;
  featureValue?: string;
  featureDescription?: string;
  package?: Package;
}

export interface Package extends TimeStamp {
  id?: number;
  name?: string;
  price?: number;
  durationDays?: number;
  status?: PACKAGE_STATUS;
  features?: PackageFeature[];
}

export interface PackageResponse {
  data: Package;
}

export interface CreatePackage {
  name: string;
  price: number;
  durationDays: number;
  status: PACKAGE_STATUS;
  features?: {
    featureKey: string;
    featureValue: string;
    featureDescription?: string;
  }[];
}

export interface UpdatePackage extends Partial<CreatePackage> {}

export interface CreatePackageFeature {
  packageId: number;
  featureKey: string;
  featureValue: string;
  featureDescription?: string;
}

export interface UpdatePackageFeature extends Partial<CreatePackageFeature> {}

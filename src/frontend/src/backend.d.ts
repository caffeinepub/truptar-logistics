import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ShipmentDetails {
    weight: number;
    description: string;
    deliveryType: Variant_express_priority_standard;
    quantity: bigint;
    category: Variant_cargo_freight_document_parcel;
}
export interface ShippingOrder {
    id: string;
    status: Variant_cancelled_pending_in_transit_delivered;
    owner: Principal;
    shipment: ShipmentDetails;
    sender: Address;
    receiver: Address;
}
export interface UserProfile {
    country: string;
    name: string;
    email: string;
    passwordHash: string;
    phone: string;
}
export interface Address {
    country: string;
    city: string;
    name: string;
    email?: string;
    address: string;
    phone: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_cancelled_pending_in_transit_delivered {
    cancelled = "cancelled",
    pending = "pending",
    in_transit = "in_transit",
    delivered = "delivered"
}
export enum Variant_cargo_freight_document_parcel {
    cargo = "cargo",
    freight = "freight",
    document_ = "document",
    parcel = "parcel"
}
export enum Variant_express_priority_standard {
    express = "express",
    priority = "priority",
    standard = "standard"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createShippingOrder(order: ShippingOrder): Promise<void>;
    getAllShippingOrders(): Promise<Array<ShippingOrder>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyShippingOrders(): Promise<Array<ShippingOrder>>;
    getShippingOrder(orderId: string): Promise<ShippingOrder>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    registerUser(profile: UserProfile): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateOrderStatus(orderId: string, status: Variant_cancelled_pending_in_transit_delivered): Promise<void>;
}

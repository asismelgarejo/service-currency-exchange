import { Schema } from "mongoose";
export const UserSchema = new Schema({
    Email: {
        type: String,
        unique: true,
    },
    Password: String,
    FirstName: String,
    LastName: String,
    Status: {
        type: String,
        enum: ["Active", "Suspended"],
        default: "Active"
    },
}, {
    virtuals: {
        ID: {
            get() {
                return this._id;
            },
        },
    },
});
UserSchema.set("toJSON", { virtuals: true });
export default function BootstrapSchema(dbClient, schema) {
    return dbClient.model("Users", schema);
}

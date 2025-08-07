import { db } from "@/app/configs/db";
import GenResponse, { StatusCode } from "@/app/configs/GenResponse";
import { IUser, IUserDetail, UserTable } from "@/db/models/UserTable";
import { eq } from "drizzle-orm";

export class UserService {
    async createUser(data: IUser): Promise<GenResponse<IUserDetail | null>>  {
        debugger;
        const user = await db.insert(UserTable).values({
            email: data.email,
            full_name: data.full_name
        }).returning();
        return GenResponse.Result(user[0] as IUserDetail, true, StatusCode.OK);
    }

    async getUser(id: string): Promise<GenResponse<IUser | null>> {
        if (!id || id.length < 30) return GenResponse.Result(null, false, StatusCode.BadRequest, 'Invalid ID');
        const user = await db.query.UserTable.findFirst({ where: (users, { eq }) => eq(users.guid, id) });
        if(user){
            return GenResponse.Result(user as IUser, true, StatusCode.OK);
        }else{
            return GenResponse.Result(null, false, StatusCode.NotFound, 'User not found');
        }
    }

    async getAllUsers(): Promise<GenResponse<IUserDetail[]>> {
        const users = await db.query.UserTable.findMany();
        return GenResponse.Result(users as IUserDetail[], true, StatusCode.OK);
    }

    async updateUser(id: number, data: IUser): Promise<GenResponse<IUser | null>> {
        const user = await db.update(UserTable).set(data).where(eq (UserTable.id, id));
        return GenResponse.Result(user as unknown as IUser, true, StatusCode.OK);
    }

    async deleteUser(id: string): Promise<GenResponse<IUser | null>> {
        const user = await db.delete(UserTable).where(eq(UserTable.guid, id));
        return GenResponse.Result(user as unknown as IUser, true, StatusCode.OK);
    }
}
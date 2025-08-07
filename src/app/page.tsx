
import { IUserDetail, IUserPlaceholder } from "@/db/models/UserTable";
import { UserService } from "@/services/user/UserService";
import { Metadata } from "next";
import {ClientButton} from "./components/ClientButton";


export const metadata: Metadata= {
  title: "Onax Media",
  description: "OnaxMedia is a platform for sharing and discovering media content.",
}

export default async function Home() {
  async function GetUser() {
    const user_data = await new UserService().getAllUsers();
    if (user_data && user_data.Data) {
      return user_data.Data;
    }
  }
  
  const user : IUserDetail[] = await GetUser() || [IUserPlaceholder];
  
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2>All Users</h2>
       <ClientButton />
       <ul>
           {user ? user.map((u, index) => (
               <li key={u.guid}>{index + 1}) {u.email} | {u.full_name}</li>
           )) : (<li>No users found</li>)}
       </ul>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}


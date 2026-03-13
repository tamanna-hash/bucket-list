import Navbar from "../components/Navbar";
import MyBucket from "./my-bucket/page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-7xl">
     <MyBucket/>
    </div>
  );
}

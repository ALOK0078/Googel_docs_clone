import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      Click <Link href="/documents/123"><span className="text-blue-600 underline">&nbsp;here &nbsp;</span></Link> to go to documents page
    </div>
  );
}
export default Home;
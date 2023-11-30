import Featured from "../../components/featured/Featured"
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import MailList from "../../components/mailList/MailList"
import Navbar from "../../components/navbar/Navbar"
import PropertyList from "../../components/propertyList/PropertyList"


function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="mt-[50px] flex flex-col items-center gap-[30px]">
        <Featured />
        <h1 className="font-bold text-[18px] w-[1024px]">Browse by property type</h1>
        <PropertyList />
        <h1 className="font-bold text-[18px] w-[1024px]">Home guests love</h1>
        <FeaturedProperties /> 
        <MailList />
        <Footer />
      </div>
    </div>
  )
}

export default Home
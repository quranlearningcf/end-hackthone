import Image from 'next/image'

const TopBrands = () => {
  return (
    <div className="w-full bg-black py-6 lg:py-8">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap gap-6 lg:gap-8 items-center justify-evenly">
          <Image 
            src="/brands/versace.svg" 
            alt="Versace" 
            width={140} 
            height={32} 
            className="h-6 lg:h-8 w-auto brightness-0 invert"
          />
          <Image 
            src="/brands/zara.svg" 
            alt="Zara" 
            width={100} 
            height={32} 
            className="h-6 lg:h-8 w-auto brightness-0 invert"
          />
          <Image 
            src="/brands/gucci.svg" 
            alt="Gucci" 
            width={140} 
            height={32} 
            className="h-6 lg:h-8 w-auto brightness-0 invert col-span-3 lg:col-span-1"
          />
          <Image 
            src="/brands/prada.svg" 
            alt="Prada" 
            width={140} 
            height={32} 
            className="h-6 lg:h-8 w-auto brightness-0 invert lg:col-span-1"
          />
          <Image 
            src="/brands/calvin.svg" 
            alt="Calvin Klein" 
            width={140} 
            height={32} 
            className="h-6 lg:h-8 w-auto brightness-0 invert lg:col-span-1"
          />
        </div>
      </div>
    </div>
  )
}

export default TopBrands


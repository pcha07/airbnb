import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import InfoCard from '../components/InfoCard'
// import Map from '../components/Map'

function Search({ searchResults }) {
  const router = useRouter()

  const { location, startDate, endDate, numOfGuests } = router.query

  const formattedStartDate = format(new Date(startDate), 'dd MMMM yy')
  const formattedEndDate = format(new Date(endDate), 'dd MMMM yy')

  const range = `${formattedStartDate} - ${formattedEndDate}`
  return (
    <div className="h-screen">
      <Header placeholder={`${location} | ${range} | ${numOfGuests} guests`} />

      <main className="flex">
        <section className="flex-grow px-6 pt-14">
          <p className="text-xs">
            300+ stays - {range} - for {numOfGuests} guests
          </p>
          <h1 className="mt-2 mb-6 text-3xl font-semibold">
            Stays in {location}
          </h1>
          <div className="text-gray-8-- hidden space-x-3 whitespace-nowrap lg:inline-flex">
            <p className="button">Cancellation Flexibilaty</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>
          <div className="flex flex-col">
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  description={description}
                  title={title}
                  star={star}
                  price={price}
                />
              )
            )}
          </div>
        </section>
        {/* <section className="hidden xl:inline-flex xl:min-w-[600px]">
            <Map searchResults={searchResults}/>
        </section> */}
      </main>
      <Footer />
    </div>
  )
}

export default Search

export async function getServerSideProps() {
  const searchResults = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json()
  )

  return {
    props: {
      searchResults,
    },
  }
}

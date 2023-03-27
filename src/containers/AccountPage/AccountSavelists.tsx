import { Tab } from '@headlessui/react'
import bookingApi, { bookingType } from 'api/bookingApi'
import StayCard from 'components/StayCard/StayCard'
import { StayDataType } from 'data/types'
import { Fragment, useEffect, useState } from 'react'
import CommonLayout from './CommonLayout'

const AccountSavelists = () => {
  // let [categories] = useState(["Stays", "Experiences", "Cars"]);
  let [categories] = useState(['Booking Bill'])

  const [booking, setBooking] = useState<StayDataType[]>([])
  useEffect(() => {
    ;(async () => {
      const { data } = await bookingApi.getAll()
      const list = data.data
        .filter((x: bookingType) => x.customerId != 0)
        .map((e: bookingType) => {
          return {
            galleryImgs: e.payments.map((x) => x.paymentImage),
            //listingCategory,
            address: e.payments.map((x) => x.status == 0 ? 'Pending' : x.status == 1 ? 'Finished' : 'Cancel' ),
            title: e.tour.tourName,
            bedrooms: '',
            href: `/pay-done/${e.payments[0].id}`,
            like: '',
            saleOff: '',
            isAds: '',
            price: e.totalPrice,
            reviewStart: '',
            reviewCount: '',
            id: '',
          }
        })
      setBooking(list)
      //console.log("list",data);
    })()
  }, [])

  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        {/* <div>
          <h2 className="text-3xl font-semibold">Booking Bill lists</h2>
        </div> */}
        {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}

        <div>
          {/* <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
              {categories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? 'bg-secondary-900 text-secondary-50 '
                          : 'text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List> */}
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {booking
                    .filter((_, i) => i < 8)
                    .map((stay) => (
                      <StayCard key={stay.id} data={stay} />
                    ))}
                </div>
            {/* <Tab.Panels> */}
              {/* <Tab.Panel className="mt-8"> */}
                {/* <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div> */}
              {/* </Tab.Panel> */}
              {/* <Tab.Panel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {DEMO_EXPERIENCES_LISTINGS.filter((_, i) => i < 8).map(
                    (stay) => (
                      <ExperiencesCard key={stay.id} data={stay} />
                    )
                  )}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel>
              <Tab.Panel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {DEMO_CAR_LISTINGS.filter((_, i) => i < 8).map((stay) => (
                    <CarCard key={stay.id} data={stay} />
                  ))}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel> */}
            {/* </Tab.Panels> */}
          {/* </Tab.Group> */}
        </div>
      </div>
    )
  }

  return (
    <div>
      <CommonLayout>{renderSection1()}</CommonLayout>
    </div>
  )
}

export default AccountSavelists

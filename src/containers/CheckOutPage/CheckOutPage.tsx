import { Tab } from '@headlessui/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import bookingApi, { createBookingType } from 'api/bookingApi'
import tourApi, { tourType } from 'api/tourApi'
import { DateRage } from 'components/HeroSearchForm/StaySearchForm'
import { GuestsObject } from 'components/HeroSearchForm2Mobile/GuestsInput'
import ModalSelectDate from 'components/ModalSelectDate'
import ModalSelectGuests from 'components/ModalSelectGuests'
import StartRating from 'components/StartRating/StartRating'
import mastercardPng from 'images/mastercard.svg'
import visaPng from 'images/vis.png'
import moment from 'moment'
import { FC, Fragment, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ButtonPrimary from 'shared/Button/ButtonPrimary'
import NcImage from 'shared/NcImage/NcImage'
import NcModal from 'shared/NcModal/NcModal'
import converSelectedDateToString from 'utils/converSelectedDateToString'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'context/AuthContext'

export interface CheckOutPageProps {
  className?: string
}

const CheckOutPage: FC<CheckOutPageProps> = ({ className = '' }) => {
  const [rangeDates, setRangeDates] = useState<DateRage>({
    startDate: moment().add(1, 'day'),
    endDate: moment().add(5, 'days'),
  })
  const [guests, setGuests] = useState<GuestsObject>({
    guestAdults: 1,
    guestChildren: 0,
    guestInfants: 0,
  })

  const { id } = useParams()
  const [selectedDate, setSelectedDate] = useState<DateRage>({
    startDate: moment().add(4, 'days'),
    endDate: moment().add(10, 'days'),
  })
  const [tour, setTour] = useState<tourType>()
  const [paymentMethod, setpaymentMethod] = useState('')
  useEffect(() => {
    ;(async () => {
      const tours = await (await tourApi.getById(Number(id))).data.data
      setSelectedDate({
        startDate: moment(tours?.tourDetails[0].startDate),
        endDate: moment(tours?.tourDetails[0].endDate),
      })
      setTour(tours)
      console.log('tour', tours)
    })()
  }, [])

  const navigate = useNavigate()
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.getIdToken || false;

  const bookingCreate = async () => {
    if (!isAuthenticated) {
      alert('Login to continues booking');
      navigate('/login')
      return;
    }

    const data: createBookingType = {
      tourId: tour?.id ?? 0,
      bookingDate: new Date(),
      numAdults: guests.guestAdults ?? 0,
      numChildren: guests.guestChildren ?? 0,
      numInfants: guests.guestInfants ?? 0,
      totalPrice: totalPrice,
      paymentMethod: paymentMethod,
    }
    const booking = await bookingApi.create(data)
    console.log(booking.data)
    navigate(`/pay-done/${booking.data.data.id}`, {replace: true})
    // window.location.href=`pay-done/${booking.data.data.id}`
    
  }
  const [totalPrice, settotalPrice] = useState(0)
  useEffect(() => {
    if (tour)
      settotalPrice(
        Number(tour.tourPrices[0]?.priceAdults) * (guests.guestAdults ?? 0) +
          Number(tour.tourPrices[0]?.priceChildren) *
            (guests.guestChildren ?? 0) +
          Number(tour.tourPrices[0]?.priceInfants) * (guests.guestInfants ?? 0),
      )
  }, [guests, tour])

  const renderSidebar = () => {
    return tour && tour?.tourDetails.length !== 0 ? (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <NcImage
                src={tour.tourDetails[0]?.destination.destinationImages[0].image.toString()}
              />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {tour.tourDetails[0].destination.name}, miền{' '}
                {tour.tourDetails[0]?.destination.region}
              </span>
              <span className="text-base font-medium mt-1 block">
                {tour.tourName}
              </span>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              {tour.tourDuration.toString()} days ·{' '}
              {tour.tourCapacity.toString()} slots
            </span>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            <StartRating />
          </div>
        </div>
        {tour.tourPrices.length !== 0 && (
          <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-semibold">Price detail</h3>
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span>Aldult</span>
              <span>
                ${tour.tourPrices[0].priceAdults.toString()} x{' '}
                {guests.guestAdults}
              </span>
            </div>
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span>Children</span>
              <span>
                ${tour.tourPrices[0].priceChildren.toString()} x{' '}
                {guests.guestChildren}
              </span>
            </div>
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span>Infants</span>
              <span>
                ${tour.tourPrices[0].priceInfants.toString()} x{' '}
                {guests.guestInfants}
              </span>
            </div>

            <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${totalPrice.toString()}</span>
            </div>
          </div>
        )}
      </div>
    ) : (
      ''
    )
  }

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Confirm and payment
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div>
            <h3 className="text-2xl font-semibold">Your trip</h3>
            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className="block lg:hidden underline  mt-1 cursor-pointer"
                >
                  View booking details
                </span>
              )}
              renderContent={renderSidebar}
              modalTitle="Booking details"
            />
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            <ModalSelectDate
              defaultValue={selectedDate}
              onSelectDate={() => {}}
              renderChildren={({ openModal }) => (
                <button
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 "
                  type="button"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Date</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      {converSelectedDateToString(selectedDate)}
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />

            <ModalSelectGuests
              defaultValue={guests}
              onChangeGuests={setGuests}
              renderChildren={({ openModal }) => (
                <button
                  type="button"
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Guests</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      <span className="line-clamp-1">
                        {`${
                          (guests.guestAdults || 0) +
                          (guests.guestChildren || 0)
                        } Guests, ${guests.guestInfants || 0} Infants`}
                      </span>
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Pay with</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

          <div className="mt-6">
            <Tab.Group>
              <Tab.List className="flex my-5">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      onClick={() => setpaymentMethod('2')}
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                        selected
                          ? 'bg-neutral-800 dark:bg-neutral-300 text-white dark:text-neutral-900'
                          : 'text-neutral-6000 dark:text-neutral-400'
                      }`}
                    >
                      E-Banking
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      onClick={() => setpaymentMethod('1')}
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                        selected
                          ? 'bg-neutral-800 dark:bg-neutral-300 text-white dark:text-neutral-900'
                          : ' text-neutral-6000 dark:text-neutral-400'
                      }`}
                    >
                      <span className="mr-2.5">COD</span>
                      {/* <img className="w-8" src={visaPng} alt="" />
                      <img className="w-8" src={mastercardPng} alt="" /> */}
                    </button>
                  )}
                </Tab>
              </Tab.List>

              {/* <Tab.Panels>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Card number </Label>
                    <Input defaultValue="111 112 222 999" />
                  </div>
                  <div className="space-y-1">
                    <Label>Card holder </Label>
                    <Input defaultValue="JOHN DOE" />
                  </div>
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Expiration date </Label>
                      <Input type="date" defaultValue="MM/YY" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>CVC </Label>
                      <Input />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Email </Label>
                    <Input type="email" defaultValue="example@gmail.com" />
                  </div>
                  <div className="space-y-1">
                    <Label>Password </Label>
                    <Input type="password" defaultValue="***" />
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div>
                </Tab.Panel>
              </Tab.Panels> */}
            </Tab.Group>
            <div className="pt-8">
              <ButtonPrimary onClick={bookingCreate}>
                Confirm and pay
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  )
}

export default CheckOutPage

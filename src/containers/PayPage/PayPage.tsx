import bookingApi, { bookingType } from 'api/bookingApi'
import paymentApi from 'api/paymentApi'
import { tourType } from 'api/tourApi'
import StartRating from 'components/StartRating/StartRating'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import moment from 'moment'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { storage } from 'service/firebase'
import ButtonPrimary from 'shared/Button/ButtonPrimary'
import NcImage from 'shared/NcImage/NcImage'
import tourApi from './../../api/tourApi'
import { DateRage } from './../../components/HeroSearchForm2/FlightSearchForm'

export interface PayPageProps {
  className?: string
}

const PayPage: FC<PayPageProps> = ({ className = '' }) => {
  const [file, setFile] = useState<any>('')
  function handleChange(e: any) {
    setFile(e.target.files[0])
  }

  const { id } = useParams()
  const [selectedDate, setSelectedDate] = useState<DateRage>({
    startDate: moment().add(4, 'days'),
    endDate: moment().add(10, 'days'),
  })
  const navigate = useNavigate()
  const [tour, setTour] = useState<tourType>()
  const [booking, setBooking] = useState<bookingType>()
  const [paymentMethod, setpaymentMethod] = useState('')
  useEffect(() => {
    ;(async () => {
      const tours = await (await tourApi.getById(Number(id))).data.data
      const bookings = await (await bookingApi.getById(Number(id))).data.data
      setSelectedDate({
        startDate: moment(bookings.tour.tourDetails[0].startDate),
        endDate: moment(bookings.tour.tourDetails[0].endDate),
      })
      setTour(tours)
      setBooking(bookings)
      // console.log('tour', tours)
    })()
  }, [])

  const handleUpload = () => {
    if (!file) {
      alert('Please upload an image first!')
    }
    const storageRef = ref(storage, `/files/${new Date().getTime()}`) // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          const res = await paymentApi.putImage(Number(booking?.payments[0].id), url)
          if (res.data.status.isSuccess == true) {
            navigate('/')
          }
        })
      },
    )
  }

  const handleReplace = () => {
    setFile(null)
  }

  const handleClick = () => {
    window.open(URL.createObjectURL(file))
  }

  // console.log('fabdfih');

  // const bookingCreate = async () => {
  //   const data: createBookingType = {
  //     tourId: tour?.id ?? 0,
  //     customerId: 1,
  //     bookingDate: new Date(),
  //     numAdults: guests.guestAdults ?? 0,
  //     numChildren: guests.guestChildren ?? 0,
  //     numInfants: guests.guestInfants ?? 0,
  //     totalPrice: totalPrice,
  //     paymentMethod: paymentMethod,
  //   }
  //   const booking = await bookingApi.create(data)
  //   console.log(booking.data)
  // }
  const renderContent = () => {
    return booking && booking.tour && booking.tour?.tourDetails.length !== 0 ? (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Congratulation 🎉
        </h2>

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* ------------------------ */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Your booking</h3>
          <div className="flex flex-col sm:flex-row sm:items-center">
            {/* <img src={file} /> */}
            {/* <div className="flex-shrink-0 w-full sm:w-40">
              <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                <NcImage src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
              </div>
            </div> */}
            <div className="flex-shrink-0 w-full sm:w-40">
              <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                <NcImage
                  src={booking.tour.tourDetails[0]?.destination.destinationImages[0].image.toString()}
                />
              </div>
            </div>
            <div className="pt-5  sm:pb-5 sm:px-20 space-y-3">
              <div>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                  {booking.tour.tourDetails[0].destination.name},
                  {booking.tour.tourDetails[0]?.destination.region}
                </span>
                <span className="text-base sm:text-lg font-medium mt-1 block">
                  {booking.tour.tourName}
                </span>
              </div>
              <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                {booking.tour.tourDuration.toString()} days ·{' '}
                {booking.tour.tourCapacity.toString()} slots
              </span>
              <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
              <StartRating />
            </div>
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            <div className="flex-1 p-5 flex space-x-4">
              <svg
                className="w-8 h-8 text-neutral-300 dark:text-neutral-6000"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.33333 8.16667V3.5M18.6667 8.16667V3.5M8.16667 12.8333H19.8333M5.83333 24.5H22.1667C23.4553 24.5 24.5 23.4553 24.5 22.1667V8.16667C24.5 6.878 23.4553 5.83333 22.1667 5.83333H5.83333C4.54467 5.83333 3.5 6.878 3.5 8.16667V22.1667C3.5 23.4553 4.54467 24.5 5.83333 24.5Z"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Date</span>
                <span className="mt-1.5 text-lg font-semibold">
                {`${selectedDate.startDate?.format('DD/MM/YYYY')} - ${selectedDate.endDate?.format('DD/MM/YYYY')}`}
                </span>
              </div>
            </div>
            <div className="flex-1 p-5 flex space-x-4">
              <svg
                className="w-8 h-8 text-neutral-300 dark:text-neutral-6000"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 5.07987C14.8551 4.11105 16.1062 3.5 17.5 3.5C20.0773 3.5 22.1667 5.58934 22.1667 8.16667C22.1667 10.744 20.0773 12.8333 17.5 12.8333C16.1062 12.8333 14.8551 12.2223 14 11.2535M17.5 24.5H3.5V23.3333C3.5 19.4673 6.63401 16.3333 10.5 16.3333C14.366 16.3333 17.5 19.4673 17.5 23.3333V24.5ZM17.5 24.5H24.5V23.3333C24.5 19.4673 21.366 16.3333 17.5 16.3333C16.225 16.3333 15.0296 16.6742 14 17.2698M15.1667 8.16667C15.1667 10.744 13.0773 12.8333 10.5 12.8333C7.92267 12.8333 5.83333 10.744 5.83333 8.16667C5.83333 5.58934 7.92267 3.5 10.5 3.5C13.0773 3.5 15.1667 5.58934 15.1667 8.16667Z"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Guests</span>
                <span className="mt-1.5 text-lg font-semibold">
                  {(
                    Number(booking?.numAdults ?? 0) +
                    Number(booking?.numChildren ?? 0) +
                    Number(booking?.numInfants ?? 0)
                  ).toString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------ */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Booking detail</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Payment code</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {booking.payments[0].paymentCode}
              </span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Date</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {moment(booking.payments[0].paymentDate).format('DD-MM-YYYY')}
              </span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Total</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                ${booking.totalPrice.toString()}
              </span>
            </div>

            {/* <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Payment method</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {booking.payments[0].paymentMethod == 1 ? 'COD' : 'E-Banking'}
              </span>
            </div> */}
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Upload Bill Image</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <div className="text-center">
                <span className="flex-1">
                  {file ? (
                    <div>
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Bill Upload"
                        style={{
                          width: '200px',
                          height: '500px',
                          paddingLeft: '10px',
                          paddingBottom: '10px',
                          cursor: 'pointer',
                        }}
                        onClick={handleClick}
                      />
                      <button
                        style={{
                          border: '1px solid white',
                          borderRadius: '30px',
                          width: '100px',
                          height: '30px',
                          marginLeft: '10px',
                        }}
                        onClick={handleReplace}
                      >
                        Replace
                      </button>
                    </div>
                  ) : (
                    <input type="file" onChange={handleChange} />
                  )}
                </span>
              </div>
            </div>

            {/* <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Payment method</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {booking.payments[0].paymentMethod == 1 ? 'COD' : 'E-Banking'}
              </span>
            </div> */}
          </div>
        </div>
        <div>
          <ButtonPrimary onClick={handleUpload}>
            Explore more stays
          </ButtonPrimary>
        </div>
      </div>
    ) : (
      ''
    )
  }

  return (
    <div className={`nc-PayPage ${className}`} data-nc-id="PayPage">
      <main className="container mt-11 mb-24 lg:mb-32 ">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  )
}

export default PayPage

import { useLoaderData, useParams } from "react-router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ServiceDetails = () => {
  const data = useLoaderData();
  const { serviceId } = useParams();
  const [service, setService] = useState({});

  useEffect(() => {
    const ServiceDetails = data.find(
      (i) => i.serviceId.toString() === serviceId.toString()
    );
    setService(ServiceDetails);
  }, [data, serviceId]);

  const handleBooking = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    
    toast.success(`Booking successful for ${service.serviceName}!`, {
      position: "top-center",
      autoClose: 2000,
    });

    
    form.reset();
  };

  return (
    <div className="flex mx-auto flex-col md:flex-row justify-center gap-20 items-start mt-10">
      <div className="md:w-3xl w-sm p-6">
        <img
          src={service.image}
          referrerPolicy="no-referrer"
          alt={service.serviceName}
          className="md:w-full md:h-96 w-80 object-cover rounded-lg"
        />
        <h1 className="md:text-3xl text-xl font-bold mt-4">{service.serviceName}</h1>
        <p className="text-pink-500 font-semibold">Price: ${service.price}</p>
        <p className="text-gray-700 mt-2">{service.description}</p>
        <p className="mt-2 text-gray-600">
          Provider: {service.providerName} ({service.providerEmail})
        </p>
        <p className="mt-1 text-gray-600">Rating: {service.rating}</p>
        <p className="mt-1 text-gray-600">Slots Available: {service.slotsAvailable}</p>
      </div>

      <form
        onSubmit={handleBooking}
        className="space-y-5 bg-gray-50 shadow-xl mt-10 p-5 w-80 mx-auto md:mx-0"
      >
        <h1 className="font-bold text-3xl">Book This Service</h1>
        <fieldset className="fieldset w-full">
          <label className="label">Name</label>
          <input name="name" type="text" className="input" placeholder="Name" required />

          <label className="label">Email</label>
          <input name="email" type="email" className="input" placeholder="Email" required />

          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Book Now
          </button>
        </fieldset>
      </form>

      <ToastContainer />
    </div>
  );
};

export default ServiceDetails;


import contact from "../assets/contact.jpg";
import { useForm} from "@formspree/react";
const Contact = () => {
  const [state, handleSubmit] = useForm("mgvejead");
  if (state.succeeded) {
    return <p className="text-center text-[18px] p-60 bg-white ">Thanks for message us, We will reply you soon.</p>;}
  return (
    <section className="max-padd-container    rounded-2xl mt-8  bg-white">
      <div className=" flex gap-4 flex-col items-center mx-4   sm:my-10 sm:flex-row p-4">
        <div className="flex-1  ">
          <img src={contact} alt="" className="rounded-md object-cover " />
        </div>
        <div className=" flex-1 w-full ">
          <form
             action="https://formspree.io/f/mgvejead"
  method="POST"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 ring-1 ring-slate-100 shadow-md rounded-lg p-4 "
          >
            <div className="flex flex-col gap-2">
              {" "}
              <label htmlFor="email">Email</label>{" "}
              <input
                type="email"
                placeholder="email"
                id="email"
                name="email"
                className="border-2 border-slate-100 rounded p-2 outline-none "
              />
             
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="enter your message here"
                rows="5"
                className="border-2 resize-none border-slate-100 rounded p-2 outline-none "
              />
             
            </div>
            <button
              type="submit"
              disabled={state.submitting}
              className="bg-gray-900 text-white p-2 rounded hover:bg-sky-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      
    </section>
  );
};

export default Contact;

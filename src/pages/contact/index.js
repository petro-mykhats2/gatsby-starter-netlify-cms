import React from "react"
// import { connect, useSelector } from "react-redux";
// import { clearCart } from "../redux/cartreducer";
import { useForm } from "react-hook-form"
import Layout from "../../components/Layout"
// import { Logger } from "sass"
// import moment from "moment";
import fetch from "cross-fetch"

const CartForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  // const [toServer, SettoServer] = useState("");
  // const dateNow = moment(Date.now()).format("DD-MM-YYYY");
  // const books = useSelector(state => state.cartreducer);

  const onSubmit = (data) => {
    console.log("data::", data)
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
      }),
    }
    fetch("/.netlify/functions/hello", requestOptions)
      .then((response) => response.json())
      .then(console.log)
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Як вас звати?"
          maxLength="21"
          id="name"
          {...register("name", {
            required: "Введіть сюди Ваше імя",
            minLength: 2,
          })}
        />
        {errors.name && <div className="error">Введіть Ваше імя</div>}
        <input
          // className="input-cart"
          type="tel"
          placeholder="Введіть номер телефону"
          id="phone"
          // name="phone"
          {...register("phone", {
            required: "Введіть номер телефону",
            minLength: 9,
          })}
        />
        {errors.phone && (
          <div className="error">Введіть коректний номер телефону</div>
        )}
        <input
          type="text"
          placeholder="Введіть пошту"
          id="email"
          {...register("email", {
            required: "Введіть Email",
            validate: (value) =>
              value.includes("@") || "Введіть коректний Email",
          })}
        />
        {errors.email && <div className="error"> {errors.email.message}</div>}
        <input type="submit" />
      </form>
    </Layout>
  )
}

export default CartForm

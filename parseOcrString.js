const parseOcrString = (string) => {

  // THIS IS THE FUNCTION THAT WILL PARSE OUR TICKETS "STRING" AND RETURN A STRUCTURED OBJECT
  // THIS IS AN EXAMPLE OF OBJECT STRUCTURE THAT COULD BE RETURNED
  //
  //  {
  //     string: (parsedString),
  //     store: (store name),
  //     products : [
  //       {
  //         label: (label name of the product on the ticket),
  //         quantity: (quantity of the product),
  //         price: (unit price)
  //         (etc.)
  //       }
  //     ]
  //  }

  return {
      string,
      store: "",
      products : [
        {
          label: "",
          quantity: "",
          price: ""
        }
      ]
  }
}

import { useState } from "react";
import html2pdf from "html2pdf.js";

function Add() {
  const [items, setItems] = useState([
    { productName: "", quantity: 1, price: 0, totalPrice: 0 },
  ]);

  const [total, setTotal] = useState(0);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;

    if (name === "quantity" || name === "price") {
      newItems[index].totalPrice =
        newItems[index].quantity * newItems[index].price;
    }

    setItems(newItems);

    const newTotalPrice = newItems.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    setTotal(newTotalPrice);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      { productName: "", quantity: 1, price: 0, totalPrice: 0 },
    ]);

    console.log(total);
  };

  const generatePDF = () => {
    const element = document.getElementById("pdf-content");

    if (element) {
      html2pdf().from(element).save("invoice.pdf");
    } else {
      console.error("Element not found.");
    }
  };

  return (
    <div>
      <div className="main text-center text-2xl font-bold my-3">
        Kranti Enterprises
      </div>
      {items.map((item, index) => (
        <div key={index} className="grid text-center p-5">
          <label className="my-2">
            Product Name:
            <input
              type="text"
              name="productName"
              value={item.productName}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Product Name"
              className="border border-black rounded-md mx-2 px-2"
            />
          </label>
          <label className="my-2">
            Quantity:
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleInputChange(index, e)}
              className="border border-black rounded-md mx-2 px-2"
            />
          </label>
          <label className="my-2">
            Price:
            <input
              type="number"
              className="border border-black rounded-md mx-2 px-2"
              name="price"
              value={item.price}
              onChange={(e) => handleInputChange(index, e)}
            />
          </label>
        </div>
      ))}
      <div className="btn text-center">
        <button
          onClick={handleAddItem}
          className="bg-orange-400 px-2 rounded-md my-5 text-center font-bold py-2"
        >
          Add Item
        </button>
      </div>
      <hr className="h-1 bg-black" />
      <div id="pdf-content" className="border border-black py-2 mx-2 mt-3">
        {/* Your HTML content to convert to PDF goes here */}
        <div className="header text-center my-2">
          <p className="font-bold">Kranit Enterprises</p>
          <p>
            CS NO 3987, NEW MALMATTA NUMBER 11001653, GANESH BHAJI MANDAI, NEAR
            GANESH TEMPLE, Uran Islampur, Sangli, Maharashtra, 415409
          </p>
          <p>Mob-8421256688</p>
        </div>
        <div className="main px-2">
          <div className="invoice flex">
            <div className="invoice border border-black w-full px-3 py-2">
              <p>Invoice:</p>
            </div>
            <div className="invoice-date border border-black w-full px-3 py-2">
              <p>Invoice Date:</p>
            </div>
          </div>
          <div className="party-details flex">
            <div className="details-of-reciver  border border-black w-full text-center font-bold py-1">
              <p>Details of reciver (Billed to)</p>
            </div>
            <div className="details-of-Consignee  border border-black w-full text-center font-bold py-1">
              <p>Details of Consignee (Shipped to)</p>
            </div>
          </div>
          <div className="details flex">
            <div className="border border-black w-full px-3 py-2">
              <p>Name:</p>
            </div>
            <div className="border border-black w-full px-3 py-2">
              <p>Name:</p>
            </div>
          </div>
          <div className="details flex">
            <div className="border border-black w-full px-3 py-2">
              <p>Address:</p>
            </div>
            <div className="border border-black w-full px-3 py-2">
              <p>Address:</p>
            </div>
          </div>
          <div className="main-bill-header flex text-center">
            <div className="srno border border-black w-52 px-3 py-2">
              <p className="text-sm font-bold">Sr.No.</p>
            </div>
            <div className="p-name font-bold border border-black w-full px-3 py-2">
              <p>Product</p>
            </div>
            <div className="qty font-bold border border-black w-52 px-3 py-2">
              <p>QTY</p>
            </div>
            <div className="rate font-bold border border-black w-72 px-3 py-2">
              <p>Rate</p>
            </div>
            <div className="total font-bold border border-black w-full px-3 py-2">
              <p>Total</p>
            </div>
          </div>

          {items.map((item, index) => (
            <div className="main-bill-header flex text-center" key={index}>
              <div className="srno border-x-2 border-black w-52 px-3 py-2">
                <p className="text-sm font-bold">{index + 1}</p>
              </div>
              <div className="p-name border-x-2 border-black w-full px-3 py-2">
                <p>{item.productName}</p>
              </div>
              <div className="qty border-x-2 border-black w-52 px-3 py-2">
                <p>{item.quantity}</p>
              </div>
              <div className="rate border-x-2 border-black w-72 px-3 py-2">
                <p>₹ {item.price}</p>
              </div>
              <div className="total border-x-2 border-black w-full px-3 py-2">
                <p>₹ {item.quantity * item.price}</p>
              </div>
            </div>
          ))}
          <div className="footer flex">
            <div className="blank border border-black w-full px-3 py-2 "></div>
            <div className="footer-main border border-black w-full px-3 py-2">
              <div className="total flex ">
                <p className="border border-black w-full px-3 py-2 font-bold text-sm">
                  Toatal Invoice Value
                </p>
                <p className="border border-black w-full px-3 py-2 font-bold text-center">
                  ₹ {total.toFixed(2)}
                </p>
              </div>
              <div className="stamp text-center">
                <p className="text-xs mt-1">
                  Ceritified that the particulars given above are true and
                  correct
                </p>
                <p className="text-lg mt-2 font-bold">Kranti Enterprises</p>
                <p className="mt-28 font-bold text-sm">Authorised Signatory</p>
              </div>
            </div>
          </div>
        </div>
        {/* ... */}
      </div>
      <div className="btn text-center">
        <button
          className="bg-blue-400 text-white px-2 rounded-md my-5 text-center font-bold py-2"
          onClick={generatePDF}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}

export default Add;

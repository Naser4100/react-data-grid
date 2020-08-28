import React, { useRef, Component } from 'react'
import Customers from './Customers';
import { useReactToPrint } from 'react-to-print';

class PrintableComponent extends Component {
  render() {
    return (
      <div>
        <Customers/>
      </div>
    )
  }
}

const CustomerPrint = () => {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="container">
      <PrintableComponent ref={componentRef} />
      <div class="row">
    <div class="col-9">
      
    </div>
    <div class="col">
    <button className="btn btn-primary ml-auto" style={{}} onClick={handlePrint}>Print this out!</button>
    </div>
  </div>
      
    </div>
  );
}

export default CustomerPrint;
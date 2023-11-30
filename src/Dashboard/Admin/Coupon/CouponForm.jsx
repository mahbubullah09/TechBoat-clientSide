import moment from "moment";
import Swal from "sweetalert2";





const CouponForm = () => {
    const Today = moment().format("YYYY-MM-DD ");


    const handleCoupon = (e) =>{
        e.preventDefault();
        const code = e.target.code.value;
        const date = e.target.date.value;
        const discount = e.target.discount.value;
        const discription = e.target.discription.value;

        const coupon ={
            code,
            date,
            discount,
            discription
        }
        console.log(coupon);

        fetch("https://tech-boat-server.vercel.app/coupons", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(coupon),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
    
              if (data.insertedId) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Coupon has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });


    }
  
  return (
    <div>
      
      <h3 className="text-4xl font-playfair font-bold text-center mt-8">
        Add Your Product
      </h3>

      <div>
        <div className="bg-white mx-10 px-5 py-4 rounded">
          <form onSubmit={handleCoupon} >
            
            
            <div className="flex gap-6 my-6">
              {/* Coupon Code */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Coupon Code*</span>
                </label>
                <input
                  type="text"
                  placeholder="Coupon Code"
                  name="code"
                  required
                
                  className="input input-bordered w-full "
                />
                
              </div>
              {/* image */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Expiry Date*</span>
                </label>
                <input
                  type="date"
                  placeholder="Select date"
                  name="date"
                  min={Today}
                  required
                  
                  className="input input-bordered w-full "
                />
                
              </div>
            </div>
            <div className="flex gap-6 my-6">
             
              {/* Discount Amount */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Discount Amount*</span>
                </label>
                <input
                  type="text"
                  placeholder="Discount Amount"
                  name="discount"
                  required
                 
                  className="input input-bordered w-full "
                />
                
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Coupon description*</span>
              </label>
              <textarea
              name="discription"
              required
               
                className="textarea textarea-bordered h-24"
                placeholder="Coupon description"
              ></textarea>
             
            </div>

            <div className="flex justify-center mt-6">
          
          <button className="bg-[#0D6EFD] text-white text-sm font-semibold px-4 py-2 rounded">
            Add Coupon
          </button>
       
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CouponForm;

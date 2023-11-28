

const CouponCard = ({data}) => {
    return (
        <div>
           <div className="container bg-gradient-to-r from-indigo-500 to-violet-500 text-white p-8 rounded-lg shadow-lg w-full mx-auto">
    <div className="text-3xl font-bold mb-4">Special Offer!</div>
    <div className="text-lg mb-4">Get <span className="text-yellow-400 font-bold">{data?.discount} TK OFF</span></div>
    <div className="text-lg mb-4">{data?.discription}</div>
    <div className="text-base mb-4">Use coupon code:</div>
    <div className="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
        <span className="text-2xl font-semibold">{data?.code}</span>
       
    </div>
    <div className="text-sm mt-4">
        <p>Valid until <span className="font-semibold">{data?.date}</span></p>
        <p>Terms and conditions apply.</p>
    </div>
</div>
            
        </div>
    );
};

export default CouponCard;
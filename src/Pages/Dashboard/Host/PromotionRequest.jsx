import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/useAxios';
import { AuthContext } from '../../../Context/AuthContext';
import LoadingSpinner from '../../../Component/shared/LoadingSpinner';
import { FaBullhorn, FaPaperPlane, FaImage } from 'react-icons/fa';
import Swal from 'sweetalert2';
import DashboardHeader from '../../../Component/Dashboard/Common/DashboardHeader';

const PromotionRequest = () => {
    const { users } = useContext(AuthContext);
    const axiosSecure = useAxios();
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [promoPercentage, setPromoPercentage] = useState(0);

    const { data: hostVehicles = [], isLoading } = useQuery({
        queryKey: ['host-vehicles-promo', users?.email],
        enabled: !!users?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/vehicles/host/${users?.email}`);
            return res.data;
        }
    });

    const handleVehicleChange = (e) => {
        const vehicle = hostVehicles.find(v => v._id === e.target.value);
        setSelectedVehicle(vehicle);
        setPromoPercentage(0);
        setDiscountPrice(0);
    };

    const handlePercentageChange = (e) => {
        const percent = parseFloat(e.target.value);
        if (percent >= 1 && percent <= 100) {
            setPromoPercentage(percent);
            if (selectedVehicle) {
                const finalPrice = selectedVehicle.pricePerDay - (selectedVehicle.pricePerDay * (percent / 100));
                setDiscountPrice(finalPrice.toFixed(2));
            }
        } else {
            setPromoPercentage(percent);
            setDiscountPrice(0);
        }
    };

    const handlePromoSubmit = async (e) => {
        e.preventDefault();
        if (!selectedVehicle || promoPercentage < 1 || promoPercentage > 100) {
            return Swal.fire("Error", "Please provide valid information", "error");
        }

        const form = e.target;
        const promoData = {
            vehicleId: selectedVehicle._id,
            vehicleName: selectedVehicle.vehicleName,
            hostEmail: users?.email,
            originalPrice: parseFloat(selectedVehicle.pricePerDay),
            discountPrice: parseFloat(discountPrice),
            promotionFee: 0,
            bannerImage: form.bannerImg.value || selectedVehicle.coverImage,
            status: 'pending',
            createdAt: new Date(),
            description: form.description.value,
            promotionPercentage: parseFloat(promoPercentage)
        };

        try {
            const res = await axiosSecure.post('/request-promotion', promoData);
            if (res.data.insertedId) {
                Swal.fire({
                    background: 'var(--card-bg)',
                    color: 'var(--text-main)',
                    icon: 'success',
                    title: 'Request Sent!',
                    text: 'Admin will review your request.'
                });
                form.reset();
                setSelectedVehicle(null);
                setPromoPercentage(0);
                setDiscountPrice(0);
            }
        } catch (err) {
            Swal.fire('Error', 'Submission failed', 'error');
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full space-y-8 animate-fade-in pb-10">
            <DashboardHeader 
                title="Flash Promotion" 
                subtitle="Boost your visibility on the home section"
                role="host"
                Icon={FaBullhorn}
                statusText="Marketing Hub"
            />

            <div className="w-full bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl p-6 md:p-10 shadow-md">
                <form onSubmit={handlePromoSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    <div className="space-y-5">
                        <div className="form-control w-full">
                            <label className="label uppercase text-[10px] font-black opacity-50">Select Vehicle</label>
                            <select onChange={handleVehicleChange} name="vehicle" className="select select-bordered w-full bg-[var(--bg-main)] border-[var(--primary)]/20 focus:border-[var(--primary)] transition-all" required>
                                <option value="" disabled selected>Choose from your collection</option>
                                {hostVehicles.map(v => (
                                    <option key={v._id} value={v._id}>{v.vehicleName}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control w-full">
                                <label className="label uppercase text-[10px] font-black opacity-50">Current Price ($)</label>
                                <input type="text" value={selectedVehicle ? selectedVehicle.pricePerDay : '0'} className="input bg-black/10 border-white/5 font-bold cursor-not-allowed" readOnly />
                            </div>
                            <div className="form-control w-full">
                                <label className="label uppercase text-[10px] font-black text-[var(--primary)]">Discount %</label>
                                <input type="number" onChange={handlePercentageChange} className="input input-bordered bg-[var(--bg-main)] border-[var(--primary)]/30 font-bold focus:ring-1 focus:ring-[var(--primary)]" placeholder="1-100" min="1" max="100" required />
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <label className="label uppercase text-[10px] font-black opacity-50">Calculated Offer Price</label>
                            <div className="input flex items-center bg-[var(--primary)]/5 border-[var(--primary)]/20 text-[var(--primary)] font-black text-xl">
                                ${discountPrice > 0 ? discountPrice : '0.00'}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="form-control w-full">
                            <label className="label uppercase text-[10px] font-black opacity-50">Promotion Banner Image</label>
                            <div className="relative">
                                <input name="bannerImg" type="text" defaultValue={selectedVehicle?.coverImage || ""} key={selectedVehicle?.coverImage} placeholder="Paste image URL or use default" className="input input-bordered w-full pl-10 bg-[var(--bg-main)] border-[var(--primary)]/20 text-xs" />
                                <FaImage className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" />
                            </div>
                            <span className="text-[9px] mt-1 opacity-40 italic">Leave as is to use existing cover image</span>
                        </div>

                        <div className="form-control w-full">
                            <label className="label uppercase text-[10px] font-black opacity-50">Offer Description</label>
                            <textarea name="description" placeholder="Describe your special offer (e.g., Weekend Special, Holiday Deal)" className="textarea textarea-bordered bg-[var(--bg-main)] border-[var(--primary)]/20 h-[108px] focus:border-[var(--primary)] resize-none" required></textarea>
                        </div>
                    </div>

                    <div className="lg:col-span-2 pt-2">
                        <button type="submit" className="btn-gradient w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-transform active:scale-[0.98] shadow-lg">
                            <FaPaperPlane className="text-sm" /> Submit Promotion Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PromotionRequest;
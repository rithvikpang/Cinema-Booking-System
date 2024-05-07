"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Promotion {
  promotion_id?: number;
  start_date: string;
  end_date: string;
  code: string;
  discount: number;
}

interface PromotionData {
  promotionId: number;
  startDate: string;
  endDate: string;
  code: string;
  discount: number;
}

interface UserProfile {
  isadmin: boolean;
}

const ManagePromos: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({ isadmin: true });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [promotions, setPromotions] = useState<PromotionData[]>([]);
  const { register, handleSubmit, reset } = useForm<Promotion>();
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/unauth-page");
        setError("No token found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
        }

        const data: UserProfile = await response.json();
        setProfile(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchPromotions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/admin/promotions", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error(`Failed to fetch promotions: ${response.status} ${response.statusText}`);
        }
    
        const data: PromotionData[] = await response.json();
        console.log("Fetched promotions data:", data); // Add this line
        setPromotions(data);
      } catch (error: any) {
        console.error("Error fetching promotions:", error.message);
      }
    };

    fetchProfile();
    fetchPromotions();
  }, []);

  useEffect(() => {
    if (!profile.isadmin) {
      router.push("/unauth-page");
    }
  }, [profile.isadmin]);

  const onSubmit = async (data: Promotion) => {
    try {
      const formattedData = {
        ...data,
        start_date: new Date(data.start_date).toISOString(),
        end_date: new Date(data.end_date).toISOString(),
      };

      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/admin/add-promotion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add promotion: ${response.status} ${response.statusText}`);
      }

      reset();
      router.push("/"); // Redirect to manage promos page after adding promotion
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  const deletePromotion = useCallback(
    async (promotionId: number) => {
      if (!promotionId || typeof promotionId !== 'number') {
        console.error("Invalid promotion ID");
        return;
      }
  
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/admin/promotions/${promotionId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to delete promotion: ${response.status} ${response.statusText}`);
        }
  
        // Remove the deleted promotion from the state
        setPromotions(promotions.filter((promotion) => promotion.promotionId !== promotionId));
      } catch (error: any) {
        console.error("Error deleting promotion:", error.message);
      }
    },
    [promotions]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-section">
        <h1>Manage Promotions</h1>
        <div className="form-section">
          <div className="order-sum-item">
            <label className="tickets-label" htmlFor="message">Promotion</label>
            <label className="tickets-label" htmlFor="message">Delete</label>
          </div>
          <hr></hr>
          {promotions.map((promotion) => (
            <div key={promotion.promotionId} className="order-sum-item">
              <label className="tickets-label" htmlFor="message">{promotion.code}</label>
              <div className="tickets-button block">
              <button
                type="button"
                onClick={() => {
                  console.log("Deleting promotion with ID:", promotion.promotionId);
                  deletePromotion(promotion.promotionId);
                }}
              >
                Delete
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h1>Add Promotion</h1>
      <div className="first-name block">
        <label htmlFor="start_date">Start Date</label>
        <input id="start_date" type="date" {...register('start_date', { required: true })} />
      </div>
      <div className="first-name block">
        <label htmlFor="end_date">End Date</label>
        <input id="end_date" type="date" {...register('end_date', { required: true })} />
      </div>
      <div className="first-name block">
        <label htmlFor="code">Promo Code</label>
        <input id="code" type="text" {...register('code', { required: true })} />
      </div>
      <div className="first-name block">
        <label htmlFor="discount">Discount</label>
        <input id="discount" type="number" step="0.01" {...register('discount', { required: true })} />
      </div>
      <div className="save-button block">
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default ManagePromos;
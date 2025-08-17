import React from "react";
import Container from "../../components/Shared/Container";
import Button from "../../components/Shared/Button/Button";
import { useState } from "react";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import axios from "axios";
import { toast } from "react-toastify"; // Assuming react-toastify is used

const JoinOurNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/subscribe`, { email });
      toast.success("Your email added successfully");
      setEmail(""); // Clear input after success
    } catch (error) {
      console.error("Subscription failed:", error);
      toast.error("Failed to add your email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div>
        <h2 className="text-primary font-gummy flex gap-5 text-center text-4xl font-bold md:text-5xl">
          Join Our Newsletter
          <span className="flex items-center justify-center gap-1">
            <img src="/logo.png" alt="logo" className="h-8 w-8" />
            CareGrid
          </span>
        </h2>
      </div>
      <div className="hero bg-base-200 rounded-4xl min-h-[565px] mt-8">
        <div className="hero-content flex-col gap-8 p-8 lg:flex-row">
          <img
            src="https://i.ibb.co.com/mrqSHgK1/Holistic-Wellness-Retreat.jpg" // Placeholder image
            className="max-w-xs rounded-4xl shadow-2xl md:max-w-xl"
            alt="Newsletter"
          />
          <div>
            <h1 className="text-4xl font-bold">Stay Updated with CareGrid</h1>
            <p className="pt-2 pb-6">
              Subscribe to our newsletter for the latest health camps, tips, and
              updates tailored to your wellness journey.
            </p>

            <div className="overflow-x-auto">
              <table className="table">
                <tbody>
                  <tr className="hover:bg-base-300 transition ease-in-out">
                    <th>Frequency</th>
                    <th>Weekly</th>
                  </tr>
                  <tr className="hover:bg-base-300 transition ease-in-out">
                    <th>Content</th>
                    <th>Health Tips & Camp Alerts</th>
                  </tr>
                  <tr className="hover:bg-base-300 transition ease-in-out">
                    <th>Privacy</th>
                    <th>100% Secure & Private</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3">
              <form onSubmit={handleSubscribe}>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="input input-bordered w-full max-w-xs"
                    required
                  />
                  <Button
                    disabled={isLoading}
                    type="submit"
                    label={isLoading ? <LoadingSpinner /> : "Subscribe"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default JoinOurNewsletter;
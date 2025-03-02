import React from "react";
import Navbar from "../layout/Navbar";
import CustomerSearch from "../customers/CustomerSearch";
import CustomerProfile from "../customers/CustomerProfile";
import PatientManagement from "../patients/PatientManagement";

const Patients: React.FC = () => {
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<
    string | null
  >(null);
  const [activeView, setActiveView] = React.useState<
    "search" | "profile" | "management"
  >("search");

  // Handler for customer selection
  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setActiveView("profile");
  };

  // Handler for back button in customer profile
  const handleBackToCustomers = () => {
    setSelectedCustomerId(null);
    setActiveView("search");
  };

  const renderContent = () => {
    switch (activeView) {
      case "search":
        return <CustomerSearch onSelectCustomer={handleCustomerSelect} />;
      case "profile":
        return (
          <CustomerProfile
            customerId={selectedCustomerId || undefined}
            onBack={handleBackToCustomers}
          />
        );
      case "management":
        return <PatientManagement />;
      default:
        return <CustomerSearch onSelectCustomer={handleCustomerSelect} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1 pt-6 pb-10 px-4">{renderContent()}</main>
    </div>
  );
};

export default Patients;

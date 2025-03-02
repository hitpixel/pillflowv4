import React from "react";
import Navbar from "../layout/Navbar";
import CustomerSearch from "../customers/CustomerSearch";
import CustomerProfile from "../customers/CustomerProfile";
import PatientManagement from "../patients/PatientManagement";
import PatientsList from "../patients/PatientsList";

const Patients: React.FC = () => {
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<
    string | null
  >(null);
  const [activeView, setActiveView] = React.useState<
    "search" | "profile" | "management" | "list"
  >("list");

  // Check URL parameters for patient ID on component mount
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const patientId = params.get("id");
    if (patientId) {
      setSelectedCustomerId(patientId);
      setActiveView("profile");
    }
  }, []);

  // Listen for custom events from PatientsList
  React.useEffect(() => {
    const handleSelectPatient = (event: any) => {
      if (event.detail && event.detail.id) {
        setSelectedCustomerId(event.detail.id);
        setActiveView("profile");
      }
    };

    window.addEventListener("selectPatient", handleSelectPatient);
    return () =>
      window.removeEventListener("selectPatient", handleSelectPatient);
  }, []);

  // Handler for customer selection
  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setActiveView("profile");
  };

  // Handler for back button in customer profile
  const handleBackToCustomers = () => {
    setSelectedCustomerId(null);
    setActiveView("list");
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
      case "list":
        return <PatientsList />;
      default:
        return <PatientsList />;
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

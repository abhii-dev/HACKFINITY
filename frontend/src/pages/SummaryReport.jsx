// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const SummaryReport = () => {
//   const [reportData, setReportData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch the summary report data from the backend
//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/requests/getall',{
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }); // Adjust the endpoint URL
//         setReportData(response.data);
//         setLoading(false);
//         console.log("lund",response);

//       } catch (err) {
//         setError('Error fetching report');
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, []);

//   // Conditional rendering based on loading and error states
//   if (loading) {
//     return <div className="text-white">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (
//     <div className="min-h-screen text-black p-6">
//       <h1 className="text-3xl font-bold mb-6">Summary Report</h1>

//       <div className="p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4">Report Overview</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="p-4 rounded-lg">
//             <h3 className="text-xl">Total Users</h3>
//             <p className="text-3xl font-bold">{reportData.totalUsers}</p>
//           </div>
//           <div className="p-4 rounded-lg">
//             <h3 className="text-xl">Total Equipment</h3>
//             <p className="text-3xl font-bold">{reportData.totalEquipment}</p>
//           </div>
//           <div className="p-4 rounded-lg">
//             <h3 className="text-xl">Total Requests</h3>
//             <p className="text-3xl font-bold">{reportData.totalRequests}</p>
//           </div>
//           <div className="p-4 rounded-lg">
//             <h3 className="text-xl">Active Requests</h3>
//             <p className="text-3xl font-bold">{reportData.activeRequests}</p>
//           </div>
//           <div className="p-4 rounded-lg">
//             <h3 className="text-xl">Returned Requests</h3>
//             <p className="text-3xl font-bold">{reportData.returnedRequests}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SummaryReport;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SummaryReport = () => {
  const [reportData, setReportData] = useState({
    totalUsers: 0,
    totalEquipment: 0,
    totalRequests: 0,
    activeRequests: 0,
    returnedRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the summary report data from the backend
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/requests/getall', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        // Assuming the API response has data in the form of an array, 
        // you can extract the needed data from that array:
        const requests = response.data; // You should check what 'response.data' looks like

        // Update the state with the report data (process according to actual API response structure)
        const totalUsers = requests.length; // Example: Calculate the number of users from the data
        const totalEquipment = requests.reduce((acc, item) => acc + item.equipment.quantity, 0); // Example: Sum up the equipment quantities
        const totalRequests = requests.length;
        const activeRequests = requests.filter(request => request.status === 'active').length;
        const returnedRequests = requests.filter(request => request.status === 'returned').length;

        // Set the state with the processed report data
        setReportData({
          totalUsers,
          totalEquipment,
          totalRequests,
          activeRequests,
          returnedRequests,
        });

        setLoading(false);
      } catch (err) {
        setError('Error fetching report');
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  // Conditional rendering based on loading and error states
  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen text-black p-6">
      <h1 className="text-3xl font-bold mb-6">Summary Report</h1>

      <div className="p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Report Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg">
            <h3 className="text-xl">Total Users</h3>
            <p className="text-3xl font-bold">{reportData.totalUsers}</p>
          </div>
          <div className="p-4 rounded-lg">
            <h3 className="text-xl">Total Equipment</h3>
            <p className="text-3xl font-bold">{reportData.totalEquipment}</p>
          </div>
          <div className="p-4 rounded-lg">
            <h3 className="text-xl">Total Requests</h3>
            <p className="text-3xl font-bold">{reportData.totalRequests}</p>
          </div>
          <div className="p-4 rounded-lg">
            <h3 className="text-xl">Active Requests</h3>
            <p className="text-3xl font-bold">{reportData.activeRequests}</p>
          </div>
          <div className="p-4 rounded-lg">
            <h3 className="text-xl">Returned Requests</h3>
            <p className="text-3xl font-bold">{reportData.returnedRequests}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryReport;

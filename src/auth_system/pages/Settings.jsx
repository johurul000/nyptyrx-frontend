import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPharmacyDetails, editPharmacy, editUser } from '../../features/AuthSlice';
import Layout from '../../components/Layout';
import Button from '../components/Button';
import Modal from '../components/EditPharmacyModal';
import Input from '../components/Input';
import EditPharmacyModal from '../components/EditPharmacyModal';
import EditUserModal from '../components/EditUserModal';


const Settings = () => {
    const dispatch = useDispatch();
    const { user, pharmacy, pharmacyId } = useSelector((state) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [pharmacyData, setPharmacyData] = useState({ name: '', owner_name: '', email: '', phone: '', address: '' });
    const [userData, setUserData] = useState({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
    });

    useEffect(() => {
        if (pharmacyId) {
            dispatch(getPharmacyDetails());
        }
    }, [dispatch, pharmacyId]);

    useEffect(() => {
        if (pharmacy) {
            setPharmacyData({
                name: pharmacy.name || '',
                owner_name: pharmacy.owner_name || '',
                email: pharmacy.email || '',
                phone: pharmacy.phone || '',
                address: pharmacy.address || ''
            });
        }

        if (user) {
          setUserData({
            first_name: user.first_name || '',
            last_name: user.last_name || '',

          });
        }

    }, [pharmacy, user]);

    // Editing user details
    const handleUserInputChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSaveUserData = () => {
      dispatch(editUser({ userId: user.id, formData: userData }));
      setIsEditingUser(false); // Close the modal after saving
    };
  
    const closeUserEditModal = () => {
      setIsEditingUser(false); // Close modal without saving
    };
  

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        dispatch(editPharmacy({ pharmacyId, formData: pharmacyData }))
        setIsEditing(false);
    };

    const handleChange = (e) => {
      const { name, value } = e.target; // Extract name and value from input
      setPharmacyData((prevData) => ({
        ...prevData, // Keep existing values
        [name]: value, // Update the changed field
      }));
    };

    const closePharmacyEditMoadal = () =>{
      setIsEditing(false)
    }




    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
              <div className="w-full max-w-2xl space-y-6">
                {/* Pharmacy Details */}
                <div className="bg-lightCard dark:bg-card p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold text-darkText dark:text-white mb-4 text-center">
                    Pharmacy Details
                  </h2>
                  <div className="space-y-3">
                    <div className="border-b border-gray-300 dark:border-gray-600 pb-2">
                      <strong className="text-grayText dark:text-gray-400">Name:</strong> 
                      <span className="text-darkText dark:text-white ml-2">{pharmacy?.name}</span>
                    </div>
                    <div className="border-b border-gray-300 dark:border-gray-600 pb-2">
                      <strong className="text-grayText dark:text-gray-400">Owner:</strong> 
                      <span className="text-darkText dark:text-white ml-2">{pharmacy?.owner_name}</span>
                    </div>
                    <div className="border-b border-gray-300 dark:border-gray-600 pb-2">
                      <strong className="text-grayText dark:text-gray-400">Email:</strong> 
                      <span className="text-darkText dark:text-white ml-2">{pharmacy?.email}</span>
                    </div>
                    <div className="border-b border-gray-300 dark:border-gray-600 pb-2">
                      <strong className="text-grayText dark:text-gray-400">Phone:</strong> 
                      <span className="text-darkText dark:text-white ml-2">{pharmacy?.phone}</span>
                    </div>
                    <div className="pb-2">
                      <strong className="text-grayText dark:text-gray-400">Address:</strong> 
                      <span className="text-darkText dark:text-white ml-2">{pharmacy?.address}</span>
                    </div>
                  </div>
                  {user?.role === 'admin' && (
                    <div className="text-center mt-4">
                      <Button onClick={handleEdit}>Edit Pharmacy</Button>
                    </div>
                  )}
                </div>

                {/* User Details */}
                <div className="bg-lightCard dark:bg-card p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold text-darkText dark:text-white mb-4 text-center">User Details</h2>
                  <div className="space-y-3">
                    <div className="border-b border-gray-300 dark:border-gray-600 pb-2">
                      <strong className="text-grayText dark:text-gray-400">Username:</strong> 
                      <span className="text-darkText dark:text-white ml-2">{user?.username}</span>
                    </div>
                    <div className="border-b border-gray-300 dark:border-gray-600 pb-2">
                      <strong className="text-grayText dark:text-gray-400">Email:</strong> 
                      <span className="text-darkText dark:text-white ml-2">{user?.email}</span>
                    </div>
                    <div className="border-b border-gray-300 dark:border-gray-600 pb-2">
                      <strong className="text-grayText dark:text-gray-400">First Name:</strong> 
                      <span className="text-darkText dark:text-white ml-2">{user?.first_name || 'None'}</span>
                    </div>
                    <div className="border-b border-gray-300 dark:border-gray-600 pb-2">
                      <strong className="text-grayText dark:text-gray-400">Last Name:</strong> 
                      <span className="text-darkText dark:text-white ml-2">{user?.last_name || 'None'}</span>
                    </div>
                    <div className="pb-2">
                      <strong className="text-grayText dark:text-gray-400">Role:</strong> 
                      <span className="text-darkText dark:text-white ml-2">{user?.role}</span>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <Button onClick={() => setIsEditingUser(true)}>Edit Profile</Button>
                  </div>
                </div>



              </div>
            </div>


            {/* Edit Pharmacy Modal (HTML-based) */}
            <EditPharmacyModal 
              isEditing={isEditing}
              pharmacyData={pharmacyData}
              closePharmacyEditMoadal={closePharmacyEditMoadal}
              handleChange={handleChange}
              handleSave={handleSave}
            />

            <EditUserModal 
            isEditingUser={isEditingUser}
            userData={userData}
            closeUserEditModal={closeUserEditModal}
            handleUserInputChange={handleUserInputChange}
            handleSaveUserData={handleSaveUserData}
            />


        </Layout>
    );
};

export default Settings;

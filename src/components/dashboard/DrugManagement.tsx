import React, { useState } from 'react';
import { Package, Upload, Download, Plus, Pencil, Eye, Trash2, X } from 'lucide-react';

interface Drug {
  id: number;
  drugName: string;
  dosage: string;
  unitSize: string;
  strength: string;
  institutionName: string;
  yearOfTender: string;
  address: string;
  phoneNumber: string;
  quantityNeeded: number;
  priceQuoted: number;
  priceOnMarket: number;
}

interface DrugFormData {
  drugName: string;
  dosage: string;
  unitSize: string;
  strength: string;
  institutionName: string;
  yearOfTender: string;
  address: string;
  phoneNumber: string;
  quantityNeeded: string;
  priceQuoted: string;
  priceOnMarket: string;
}

const initialFormData: DrugFormData = {
  drugName: '',
  dosage: '',
  unitSize: '',
  strength: '',
  institutionName: '',
  yearOfTender: '',
  address: '',
  phoneNumber: '',
  quantityNeeded: '',
  priceQuoted: '',
  priceOnMarket: ''
};

export default function DrugManagement() {
  const [drugs, setDrugs] = useState<Drug[]>([
    {
      id: 1,
      drugName: 'Paracetamol',
      dosage: '500mg',
      unitSize: '100 tablets',
      strength: '500mg',
      institutionName: 'Central Hospital',
      yearOfTender: '2024',
      address: '123 Health St, Accra',
      phoneNumber: '+233 20 123 4567',
      quantityNeeded: 10000,
      priceQuoted: 2.50,
      priceOnMarket: 3.00
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [formData, setFormData] = useState<DrugFormData>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDrug: Drug = {
      id: selectedDrug?.id || Date.now(),
      ...formData,
      quantityNeeded: parseInt(formData.quantityNeeded),
      priceQuoted: parseFloat(formData.priceQuoted),
      priceOnMarket: parseFloat(formData.priceOnMarket)
    };

    if (modalMode === 'edit') {
      setDrugs(drugs.map(drug => drug.id === selectedDrug?.id ? newDrug : drug));
    } else {
      setDrugs([...drugs, newDrug]);
    }

    setIsModalOpen(false);
    setFormData(initialFormData);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle CSV/Excel file upload
      console.log('File uploaded:', file);
    }
  };

  const handleExport = () => {
    // Handle export to CSV/Excel
    console.log('Exporting data...');
  };

  const openModal = (mode: 'add' | 'edit' | 'view', drug?: Drug) => {
    setModalMode(mode);
    setSelectedDrug(drug || null);
    if (drug && mode !== 'add') {
      setFormData({
        ...drug,
        quantityNeeded: drug.quantityNeeded.toString(),
        priceQuoted: drug.priceQuoted.toString(),
        priceOnMarket: drug.priceOnMarket.toString()
      });
    } else {
      setFormData(initialFormData);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Rest of the table code remains the same until the modal */}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {modalMode === 'add' ? 'Add New Drug' : modalMode === 'edit' ? 'Edit Drug' : 'View Drug'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Drug Name</label>
                <input
                  type="text"
                  name="drugName"
                  value={formData.drugName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  disabled={modalMode === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Dosage</label>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  disabled={modalMode === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Unit Size</label>
                <input
                  type="text"
                  name="unitSize"
                  value={formData.unitSize}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  disabled={modalMode === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Strength</label>
                <input
                  type="text"
                  name="strength"
                  value={formData.strength}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  disabled={modalMode === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Institution Name</label>
                <input
                  type="text"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  disabled={modalMode === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Year of Tender</label>
                <input
                  type="text"
                  name="yearOfTender"
                  value={formData.yearOfTender}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  disabled={modalMode === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  disabled={modalMode === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  disabled={modalMode === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity Needed</label>
                <input
                  type="number"
                  name="quantityNeeded"
                  value={formData.quantityNeeded}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  disabled={modalMode === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price Quoted</label>
                <input
                  type="number"
                  step="0.01"
                  name="priceQuoted"
                  value={formData.priceQuoted}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  disabled={modalMode === 'view'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price on Market</label>
                <input
                  type="number"
                  step="0.01"
                  name="priceOnMarket"
                  value={formData.priceOnMarket}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  disabled={modalMode === 'view'}
                />
              </div>

              <div className="col-span-2 mt-4">
                {modalMode !== 'view' && (
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  >
                    {modalMode === 'add' ? 'Add Drug' : 'Save Changes'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { Input } from '../../ui/input';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const AuctionsFiltersForm = () => {
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100000,
  });
  const [selectedYear, setSelectedYear] = useState<string>('2008');
  const [selectedMileage, setSelectedMileage] = useState<string>('50000');
  const [selectedCondition, setSelectedCondition] = useState<string>('new');
  const makes = [
    'Toyota',
    'Honda',
    'Ford',
    'Chevrolet',
    'BMW',
    'Mercedes-Benz',
    'Audi',
    'Volkswagen',
    'Nissan',
    'Hyundai',
  ];

  const years = [
    '2023',
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
  ];
  const mileages = [
    '0-10,000',
    '10,001-20,000',
    '20,001-30,000',
    '30,001-40,000',
    '40,001-50,000',
    '50,001-100,000',
    '100,001+',
  ];
  const conditions = ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'];

  const modelsByMake: { [key: string]: string[] } = {
    Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander'],
    Honda: ['Civic', 'Accord', 'CR-V', 'Pilot'],
    Ford: ['F-150', 'Mustang', 'Explorer', 'Escape'],
    Chevrolet: ['Silverado', 'Equinox', 'Malibu', 'Traverse'],
    BMW: ['3 Series', '5 Series', 'X5', 'X3'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'GLE', 'GLC'],
    Audi: ['A4', 'A6', 'Q5', 'Q7'],
    Volkswagen: ['Jetta', 'Passat', 'Atlas', 'Tiguan'],
    Nissan: ['Altima', 'Rogue', 'Sentra', 'Murano'],
    Hyundai: ['Sonata', 'Tucson', 'Santa Fe', 'Elantra'],
  };

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    setSelectedModel('');
    setModels(modelsByMake[make] || []);
  };
  const handleModelChange = (model: string) => {
    setSelectedModel(model);
  };
  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };
  const handleMileageChange = (mileage: string) => {
    setSelectedMileage(mileage);
  };
  const handleConditionChange = (condition: string) => {
    setSelectedCondition(condition);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-6 border-r border-gray-200 dark:border-gray-800 md:w-64 flex-shrink-0">
      <h2 className="text-lg font-semibold mb-4">Auto Bid Hunter</h2>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="price-range"
            className="block text-sm font-medium mb-2"
          >
            Price Range
          </label>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Input
              id="price-range-min"
              type="number"
              placeholder="Starting Price"
              value={priceRange.min}
              onChange={(e) =>
                handlePriceRangeChange(Number(e.target.value), priceRange.max)
              }
              className="w-full"
            />
            <span>-</span>
            <Input
              id="price-range-max"
              type="number"
              placeholder="Current Price"
              value={priceRange.max}
              onChange={(e) =>
                handlePriceRangeChange(priceRange.min, Number(e.target.value))
              }
              className="w-full"
            />
          </div>
        </div>
        <div>
          <label htmlFor="make" className="block text-sm font-medium mb-2">
            Make
          </label>
          <Select value={selectedMake} onValueChange={handleMakeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Make" />
            </SelectTrigger>
            <SelectContent>
              {makes.map((make) => (
                <SelectItem key={make} value={make}>
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="model" className="block text-sm font-medium mb-2">
            Model
          </label>
          <Select value={selectedModel} onValueChange={handleModelChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="year" className="block text-sm font-medium mb-2">
            Year
          </label>
          <Select value={selectedYear} onValueChange={handleYearChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem key="" value="">
              Any
            </SelectItem> */}
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="mileage" className="block text-sm font-medium mb-2">
            Mileage
          </label>
          <Select value={selectedMileage} onValueChange={handleMileageChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Mileage" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem key="" value="">
              Any
            </SelectItem> */}
              {mileages.map((mileage) => (
                <SelectItem key={mileage} value={mileage}>
                  {mileage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="condition" className="block text-sm font-medium mb-2">
            Stan:
          </label>
          <Select
            value={selectedCondition}
            onValueChange={handleConditionChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Condition" />
            </SelectTrigger>
            <SelectContent>
              {conditions.map((condition) => (
                <SelectItem key={condition} value={condition}>
                  {condition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
  );
};

export default AuctionsFiltersForm;

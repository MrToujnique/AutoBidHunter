'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { auctions } from '@/constants';
import { translateCondition } from '@/functions';

const MainPage = ({ locale }: { locale: string }) => {
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
  // const auctions = [
  //   {
  //     id: 1,
  //     make: 'Toyota',
  //     model: 'Camry',
  //     year: 2020,
  //     mileage: 35000,
  //     condition: 'Used - Good',
  //     currentPrice: 22500,
  //     timeRemaining: '2h 15m',
  //   },
  //   {
  //     id: 2,
  //     make: 'Honda',
  //     model: 'Civic',
  //     year: 2018,
  //     mileage: 45000,
  //     condition: 'Used - Fair',
  //     currentPrice: 16800,
  //     timeRemaining: '1d 8h',
  //   },
  //   {
  //     id: 3,
  //     make: 'Ford',
  //     model: 'F-150',
  //     year: 2021,
  //     mileage: 25000,
  //     condition: 'Used - Like New',
  //     currentPrice: 35000,
  //     timeRemaining: '3d 12h',
  //   },
  //   {
  //     id: 4,
  //     make: 'Chevrolet',
  //     model: 'Equinox',
  //     year: 2019,
  //     mileage: 28000,
  //     condition: 'Used - Good',
  //     currentPrice: 19500,
  //     timeRemaining: '5h 45m',
  //   },
  //   {
  //     id: 5,
  //     make: 'BMW',
  //     model: '3 Series',
  //     year: 2017,
  //     mileage: 65000,
  //     condition: 'Used - Fair',
  //     currentPrice: 28000,
  //     timeRemaining: '1d 3h',
  //   },
  //   {
  //     id: 6,
  //     make: 'Mercedes-Benz',
  //     model: 'C-Class',
  //     year: 2020,
  //     mileage: 18000,
  //     condition: 'Used - Like New',
  //     currentPrice: 38000,
  //     timeRemaining: '2d 6h',
  //   },
  //   {
  //     id: 7,
  //     make: 'Audi',
  //     model: 'A4',
  //     year: 2019,
  //     mileage: 32000,
  //     condition: 'Used - Good',
  //     currentPrice: 25000,
  //     timeRemaining: '6h 30m',
  //   },
  //   {
  //     id: 8,
  //     make: 'Volkswagen',
  //     model: 'Jetta',
  //     year: 2020,
  //     mileage: 22000,
  //     condition: 'Used - Like New',
  //     currentPrice: 18000,
  //     timeRemaining: '1d 15h',
  //   },
  //   {
  //     id: 9,
  //     make: 'Nissan',
  //     model: 'Altima',
  //     year: 2018,
  //     mileage: 40000,
  //     condition: 'Used - Fair',
  //     currentPrice: 15500,
  //     timeRemaining: '8h 10m',
  //   },
  //   {
  //     id: 10,
  //     make: 'Hyundai',
  //     model: 'Sonata',
  //     year: 2021,
  //     mileage: 15000,
  //     condition: 'New',
  //     currentPrice: 20000,
  //     timeRemaining: '2d 3h',
  //   },
  // ];
  // const filteredAuctions = auctions.filter((auction) => {
  //   return (
  //     auction.currentPrice >= priceRange.min &&
  //     auction.currentPrice <= priceRange.max &&
  //     (selectedMake === '' || auction.make === selectedMake) &&
  //     (selectedModel === '' || auction.model === selectedModel) &&
  //     (selectedYear === '' || auction.year.toString() === selectedYear) &&
  //     (selectedMileage === '' ||
  //       mileageRangeIncludes(auction.mileage, selectedMileage)) &&
  //     (selectedCondition === '' || auction.condition === selectedCondition)
  //   );
  // });
  // function mileageRangeIncludes(mileage: number, range: string) {
  //   switch (range) {
  //     case '0-10,000':
  //       return mileage >= 0 && mileage <= 10000;
  //     case '10,001-20,000':
  //       return mileage >= 10001 && mileage <= 20000;
  //     case '20,001-30,000':
  //       return mileage >= 20001 && mileage <= 30000;
  //     case '30,001-40,000':
  //       return mileage >= 30001 && mileage <= 40000;
  //     case '40,001-50,000':
  //       return mileage >= 40001 && mileage <= 50000;
  //     case '50,001-100,000':
  //       return mileage >= 50001 && mileage <= 100000;
  //     case '100,001+':
  //       return mileage > 100000;
  //     default:
  //       return false;
  //   }
  // }
  return (
    <div className="flex flex-col md:flex-row h-screen">
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
            <label
              htmlFor="condition"
              className="block text-sm font-medium mb-2"
            >
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
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white dark:bg-gray-950 shadow-sm flex items-center justify-between px-6 py-4">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search car auctions..."
              className="pl-10 w-full"
            />
          </div>
          <div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <img
                src="/placeholder.svg"
                width="32"
                height="32"
                className="rounded-full"
                alt="Avatar"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </div>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {auctions.map((auction) => (
            <div
              key={auction.id}
              className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden border border-gray"
            >
              <img
                src="https://wykop.pl/cdn/c3201142/comment_MJtwAOw38qR1ZzwjNnhEFYijUCYDsSoP.jpg"
                alt={`${auction.make} ${auction.model}`}
                width={400}
                height={225}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {auction.make} {auction.model}
                </h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500 dark:text-gray-400">
                    {auction.year} - {auction.mileage} km -{' '}
                    {translateCondition(auction.condition)}
                  </span>
                  <span className="text-primary font-semibold">
                    {auction.currentPrice.toLocaleString()} PLN
                  </span>
                </div>
                {/* TODO time remaining with schema db */}
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  Pozostały czas: 2h 15m
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

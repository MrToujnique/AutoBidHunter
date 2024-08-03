import { IAuctionPage } from './AuctionPage.types';
import { getAuctionById } from '@/lib/db';
import { AuctionSchema } from '@/schemas/AuctionSchemas';
import { getTranslations } from 'next-intl/server';
import PlaceBidSection from '@/components/molecules/PlaceBidSection';
import CameraIcon from '@/assets/icons/CameraIcon';

const AuctionPage = async ({ auctionId, locale }: IAuctionPage) => {
  const t = await getTranslations({ namespace: undefined, locale });

  const result = await getAuctionById(Number(auctionId));

  const validatedData = AuctionSchema.safeParse(result);

  if (!validatedData.success) {
    return <div>Something went wrong</div>; // TODO adapt
  }

  const auction = validatedData.data;

  const {
    bodyType,
    color,
    currentPrice,
    description,
    doorCount,
    drivetrain,
    endsAt,
    engineCapacity,
    fuelType,
    id,
    isAccidentFree,
    isNew,
    isServicedAtDealer,
    make,
    mileage,
    model,
    power,
    seatCount,
    startingPrice,
    transmission,
    vin,
    year,
    gallery,
    sellerId,
  } = auction;

  const mileageInfo = `${t('carSpecs.mileage')}: ${mileage} km`;

  const engineCapacityInfo = `${t(
    'carSpecs.engineCapacity',
  )}: ${engineCapacity} CC`;

  const transmissionTypeInfo = `${t('carSpecs.transmission')}: ${t(
    `carSpecs.${transmission}`,
  )}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <img
            src="/placeholder.svg"
            width={800}
            height={500}
            alt="Car Image"
            className="w-full h-auto rounded-lg object-cover"
          />
          <div className="mt-4 flex justify-between items-center px-4 py-2 bg-muted rounded-b-lg">
            <div className="flex items-center gap-2">
              <CameraIcon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {gallery?.length || 0} {t('messages.photosAbbreviation')}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">
              {year} {make} {model}
            </h1>
            <p className="text-muted-foreground">
              {mileageInfo} | {engineCapacityInfo} | {transmissionTypeInfo}
            </p>
          </div>
          <div className="space-y-2 border rounded-lg p-4">
            <h2 className="text-2xl font-bold">{t('carSpecs.parameters')}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">{t('carSpecs.make')}</p>
                <p className="font-medium">{make}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t('carSpecs.model')}</p>
                <p className="font-medium">{model}</p>
              </div>
              <div>
                <p className="text-muted-foreground">
                  {t('carSpecs.yearOfManufacture')}
                </p>
                <p className="font-medium">{year}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t('carSpecs.mileage')}</p>
                <p className="font-medium">{mileage}</p>
              </div>
              <div>
                <p className="text-muted-foreground">
                  {t('carSpecs.engineCapacity')}
                </p>
                <p className="font-medium">{engineCapacity}</p>
              </div>
              <div>
                <p className="text-muted-foreground">
                  {t('carSpecs.transmission')}
                </p>
                <p className="font-medium">{t(`carSpecs.${transmission}`)}</p>
              </div>
            </div>
          </div>
          <PlaceBidSection
            auctionId={id}
            currentPriceServerSide={currentPrice}
            endsAt={endsAt.toISOString()}
          />
          {/* <div className="space-y-2">
            <h2 className="text-2xl font-bold">Contact Seller</h2>
            <form className="grid gap-4">
              <Input type="text" placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Textarea placeholder="Your Message" rows={3} />
              <Button type="submit" className="justify-self-end">
                Contact Seller
              </Button>
            </form>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;

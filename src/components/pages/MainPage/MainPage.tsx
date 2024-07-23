import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAuctions } from '@/lib/db';
import { AuctionsSchema } from '@/schemas/AuctionSchemas';
import AuctionsList from '@/components/organisms/AuctionsList/AuctionsList';
import MainPagePreloader from '@/components/preloaders/MainPagePreloader/MainPagePreloader';
import AuctionsFiltersForm from '@/components/organisms/AuctionsFilterForm/AuctionsFiltersForm';
import SearchIcon from '@/assets/icons/SearchIcon';

const MainPage = async ({ locale }: { locale: string }) => {
  const result = await getAuctions();

  const validatedResult = AuctionsSchema.safeParse(result);

  const renderAuctions = () => {
    if (!validatedResult.success) {
      return <div>Something went wrong</div>; // TODO handle
    }

    const auctions = validatedResult.data;

    return (
      <>
        <MainPagePreloader auctions={auctions} />
        <AuctionsList locale={locale} />
      </>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <AuctionsFiltersForm />
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
        {renderAuctions()}
      </div>
    </div>
  );
};

export default MainPage;

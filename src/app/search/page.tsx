"use client"
import { JSX, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { PAGE_EVENTS_SEARCH } from '@/app/_data/constants';
import withPageTracking from '@/app/_hocs/withPageTracking';
import QuestionsAnswers from '@/app/_widgets/QuestionsAnswers';
import SearchResults from '@/app/_widgets/SearchResults';
import BasicSearch from "@/app/_widgets/BasicSearch"
import HomeHighlighted from '../_widgets/HomeHighlighted';
import { HIGHLIGHTED_ARTICLES_RFKID } from '../_data/customizations';

const Search = (): JSX.Element => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const [totalItems, setTotalItems] = useState<number>(0);

  return (
    <>
      <div className="bg-blue-700 flex justify-center py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="w-[800px] text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white">Explore Destinations</h1>
          <BasicSearch rfkId="rfkid_6" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="m-auto pt-10 min-h-screen bg-gray-50">
          {totalItems > 0 &&
            <div className="mb-6">
              <p className="text-gray-800 text-lg w-full text-left">Showing results for <strong className="text-blue-700 text-700">{`"${query}"`}</strong></p>
            </div>
          }
          <QuestionsAnswers
            key={`${query}-questions`}
            rfkId="rfkid_qa"
            defaultKeyphrase={query}
            defaultRelatedQuestions={3}
          />
          <SearchResults key={`${query}-search`} rfkId="skywings_search_results" defaultKeyphrase={query} onTotalItemsChange={setTotalItems} />


          {/* Highlighted Articles Widget */}
          <HomeHighlighted rfkId={HIGHLIGHTED_ARTICLES_RFKID} />
        </div>
      </div>
    </>

  );
};

export default withPageTracking(Search, PAGE_EVENTS_SEARCH);

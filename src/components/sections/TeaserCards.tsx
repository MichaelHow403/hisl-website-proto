"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LOCKED_CONTENT } from "@/lib/content-lock";
import { IMAGES, ImageId } from "@/lib/imagery";
import OptimizedImage from "@/components/OptimizedImage";

type Card = {
  title: string;
  body: string;
  to: string;
  imageId?: ImageId;
};

type Props = {
  cards?: Card[];
};

export default function TeaserCards({ cards }: Props) {
  // Use locked content as defaults
  const teaserData = LOCKED_CONTENT.home.about_teasers;
  const finalCards = cards || teaserData.cards;

  return (
    <section className="py-16">
      <div className="container-wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {finalCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="group relative overflow-hidden rounded-xl bg-panel border border-edge hover:border-aiGreen/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Link href={card.to} className="block">
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    {card.imageId && (
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <OptimizedImage 
                            imageId={card.imageId as ImageId} 
                            alt={card.title} 
                            width={64}
                            height={64}
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-text group-hover:text-aiGreen transition-colors mb-3">
                        {card.title}
                      </h3>
                      <p className="text-muted leading-relaxed mb-4">
                        {card.body}
                      </p>
                      <div className="flex items-center text-brandGold font-medium group-hover:text-aiGreen transition-colors">
                        Learn more
                        <svg 
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

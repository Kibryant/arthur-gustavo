/* eslint-disable prettier/prettier */
'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import { Star } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface Feedback {
  id: number
  name: string
  role: string
  avatar: string
  content: string
  rating: number
}

interface FeedbacksProps {
  feedbacks: Feedback[]
}

export default function FeedbacksSwiper({ feedbacks }: FeedbacksProps) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='my-swiper'
      >
        {feedbacks.map((feedback) => (
          <SwiperSlide key={feedback.id}>
            <Card className="overflow-hidden w-full max-w-xl">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={feedback.avatar}
                          alt={feedback.name}
                        />
                        <AvatarFallback>
                          {feedback.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold ">
                          {feedback.name}
                        </h3>
                        <p className="text-primary">{feedback.role}</p>
                      </div>
                    </div>
                    <p className="text-lg leading-relaxed">
                      {feedback.content}
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={`star-${i + 1}`}
                          className={`w-5 h-5 ${i < feedback.rating
                            ? 'text-primary fill-primary'
                            : ''
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

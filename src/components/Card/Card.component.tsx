import { Card as ShadcnCard, CardContent as ShadcnCardContent } from '@/components/ui/card';
import { CardProps } from './Card.types';
import { CARD_SIZE_CONFIG } from './Card.config';

export const Card = (props: CardProps) => {
    const { size = 'sm', children } = props;

  return (
   <ShadcnCard className={`border-2 border-purple-300 shadow-${size}`}>
        <ShadcnCardContent className={`${CARD_SIZE_CONFIG[size]}`}>
            {children}
        </ShadcnCardContent>
   </ShadcnCard>
  )
}

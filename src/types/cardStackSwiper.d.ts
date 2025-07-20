import { ReactNode } from "react";

declare module "react-native-card-stack-swiper" {
  interface CardStackProps {
    children: ReactNode;
  }

  interface CardProps {
    children: ReactNode;
  }
}

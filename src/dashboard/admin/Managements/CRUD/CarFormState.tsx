/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

const [carForm, setCarForm] = useState<CarFormState>({
  make: "",
  model: "",
  year: "",
  features: "",
  pricing: "",
  image: null,
});

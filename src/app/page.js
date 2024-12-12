"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import Image from "next/image";
import { Button}  from "@/components/ui/button";
import  {Input}  from "@/components/ui/input";
import {ThemeSwitcher} from "@/components/themeSwitcher";


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

export default function Home() {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const difKelvin = 273.15;

  const handleSub = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) fetchClima();
  };

  const [ciudad, setCuidad] = useState("");
  const [dataClima, setDataClima] = useState(null);

  const handleCambioCiudad = (e) => {
    setCuidad(e.target.value);
  };

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await response.json();
      setDataClima(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
        <header className="row-start-1">
  <ThemeSwitcher />
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center">Clima</h1>
        <form
          className="flex flex-col gap-4 items-center sm:items-start"
          onSubmit={handleSub}
        >
          <Input
            type="text"
            value={ciudad}
            onChange={handleCambioCiudad}
            placeholder="Ingrese una ciudad"
            className=" text-black"
          />
          <Button type="submit">Buscar</Button>
        </form>
     

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {dataClima && (
            <div className="weather-container">
              <Card>
                <CardHeader>
                  <CardTitle>{dataClima.name}</CardTitle>
                  <CardDescription>
                    <p>{dataClima.sys?.country}</p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-bold"> Temperatura: </p>{" "}
                  <p>{parseInt(dataClima?.main?.temp - difKelvin)}°c </p>
                  <Image
                    src={`http://openweathermap.org/img/w/${dataClima.weather[0].icon}.png`}
                    width={100}
                    height={100}
                    alt="clima"
                    className="weather-icon"
                  />
                </CardContent>
                <CardFooter>
                  <p className="font-bold">Condición Meteorologíca:</p>{" "}
                  
                </CardFooter>
                <CardFooter>  <p> {dataClima.weather[0].description}</p></CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}

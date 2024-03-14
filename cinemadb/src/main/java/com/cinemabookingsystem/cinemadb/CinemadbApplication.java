package com.cinemabookingsystem.cinemadb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories("com.cinemabookingsystem.cinemadb.repository")
@ComponentScan(basePackages = { "com.cinemabookingsystem.cinemadb" })
@EntityScan("com.cinemabookingsystem.cinemadb.model") 
@SpringBootApplication
public class CinemadbApplication {

	public static void main(String[] args) {
		SpringApplication.run(CinemadbApplication.class, args);
	}

}

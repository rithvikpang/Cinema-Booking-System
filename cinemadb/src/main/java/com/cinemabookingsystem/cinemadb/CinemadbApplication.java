package com.cinemabookingsystem.cinemadb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories("my.package.base.*")
@ComponentScan(basePackages = { "my.package.base.*" })
@EntityScan("my.package.base.*") 
@SpringBootApplication
public class CinemadbApplication {

	public static void main(String[] args) {
		SpringApplication.run(CinemadbApplication.class, args);
	}

}

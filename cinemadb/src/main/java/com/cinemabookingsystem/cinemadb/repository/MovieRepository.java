package com.cinemabookingsystem.cinemadb.repository;
import java.util.List;
import com.cinemabookingsystem.cinemadb.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    List<Movie> findByTitleContainingIgnoreCase(String title);
}

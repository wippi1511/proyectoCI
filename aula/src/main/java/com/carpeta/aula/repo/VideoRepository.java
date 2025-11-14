package com.carpeta.aula.repo;

import com.carpeta.aula.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, Integer> {
}

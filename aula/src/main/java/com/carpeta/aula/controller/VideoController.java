package com.carpeta.aula.controller;

import com.carpeta.aula.model.Video;
import com.carpeta.aula.repo.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/videos")
@CrossOrigin(origins = "*")
public class VideoController {

    @Autowired
    private VideoRepository videoRepository;

    @GetMapping
    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    @PostMapping
    public Video createVideo(@RequestBody Video video) {
        return videoRepository.save(video);
    }

    @PutMapping("/{id}")
    public Video updateVideo(@PathVariable int id, @RequestBody Video video) {
        Video existente = videoRepository.findById(id).orElseThrow();
        existente.setTitulo(video.getTitulo());
        existente.setDescripcion(video.getDescripcion());
        existente.setCurso(video.getCurso());
        existente.setLink(video.getLink());
        return videoRepository.save(existente);
    }

    @DeleteMapping("/{id}")
    public void deleteVideo(@PathVariable int id) {
        videoRepository.deleteById(id);
    }
}

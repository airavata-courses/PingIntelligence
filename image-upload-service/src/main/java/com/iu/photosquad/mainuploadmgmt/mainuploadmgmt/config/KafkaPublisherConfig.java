package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.config;

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;

import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto.KafkaAlbumModel;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.Album;

@Configuration
public class KafkaPublisherConfig {
	
	@Bean
	public ProducerFactory<String,KafkaAlbumModel> producerFactory(){
			Map<String,Object> config = new HashMap<>();
	        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka:9092");
	        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
	        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
//	        config.put(ProducerConfig.FETCH_MAX_BYTES_CONFIG, "41943040");

	        return new DefaultKafkaProducerFactory<>(config);
	    }
	
	@Bean
	public KafkaTemplate<String, KafkaAlbumModel> kafkaTemplate(){
		return new KafkaTemplate<>(producerFactory());
	}
}

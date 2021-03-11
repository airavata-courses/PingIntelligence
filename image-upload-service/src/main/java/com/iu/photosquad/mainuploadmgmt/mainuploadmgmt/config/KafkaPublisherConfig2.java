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

import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto.DeleteAlbum;

@Configuration
public class KafkaPublisherConfig2 {
	
	@Bean
	public ProducerFactory<String,DeleteAlbum> producerFactory1(){
			Map<String,Object> config = new HashMap<>();
	        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka:9092");
	        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
	        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
//	        config.put(ProducerConfig.FETCH_MAX_BYTES_CONFIG, "41943040");

	        return new DefaultKafkaProducerFactory<>(config);
	    }
	
	@Bean
	public KafkaTemplate<String, DeleteAlbum> kafkaTemplate1(){
		return new KafkaTemplate<>(producerFactory1());
	}

	

}
